import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Employee } from '@app/employee/employee';
import { Expense } from '@app/expense/expense';
import { ReportItem } from '@app/report/report-item';
import { Report } from '@app/report/report';
import { EmployeeService } from '@app/employee/employee.service';
import { ExpenseService } from '@app/expense/expense.service';
import { ReportService } from '@app/report/report.service';
import { PDFURL } from '@app/constants';
@Component({
 templateUrl: './generator.component.html',
})
export class GeneratorComponent implements OnInit, OnDestroy {
 // form
 generatorForm: FormGroup;
 employeeid: FormControl;
 expenseid: FormControl;
 // data
 formSubscription?: Subscription;
 expenses$?: Observable<Expense[]>; // everybody's expenses
 employees$?: Observable<Employee[]>; // all employees
 employeeexpenses$?: Observable<Expense[]>; // all expenses for a particular employee
 items: Array<ReportItem>; // expense items that will be in report
 selectedexpenses: Expense[]; // expenses that being displayed currently in app
 selectedExpense: Expense; // the current selected expense
 selectedEmployee: Employee; // the current selected employee
 // misc
 pickedExpense: boolean;
 pickedEmployee: boolean;
 generated: boolean;
 hasExpenses: boolean;
 msg: string;
 total: number;
 reportno: number = 0;
 constructor(
 private builder: FormBuilder,
 private employeeService: EmployeeService,
 private expenseService: ExpenseService,
 private reportService: ReportService
 ) {
 this.pickedEmployee = false;
 this.pickedExpense = false;
 this.generated = false;
 this.msg = '';
 this.employeeid = new FormControl('');
 this.expenseid = new FormControl('');
 this.generatorForm = this.builder.group({
 expenseid: this.expenseid,
 employeeid: this.employeeid,
 });
 this.selectedExpense = {
 id: 0,
 employeeid: 0,
 categoryid: '',
 description: '',
 amount: 0.0,
 dateincurred: '',
 receipt: false,
 receiptscan: '',
 };
 this.selectedEmployee = {
 id: 0,
 title: '',
 firstname: '',
 lastname: '',
 phoneno: '',
 email: '',
 };
 this.items = new Array<ReportItem>();
 this.selectedexpenses = new Array<Expense>();
 this.hasExpenses = false;
 this.total = 0.0;
 } // constructor
 ngOnInit(): void {
 this.onPickEmployee();
 this.onPickExpense();
 this.msg = 'loading employees and expenses from server...';
 (this.employees$ = this.employeeService.get()),
 catchError((err) => (this.msg = err.message));
 (this.expenses$ = this.expenseService.get()),
 catchError((err) => (this.msg = err.message));
 this.msg = 'server data loaded';
 } // ngOnInit
 ngOnDestroy(): void {
 if (this.formSubscription !== undefined) {
 this.formSubscription.unsubscribe();
 }
 } // ngOnDestroy
 /**
 * onPickEmployee - Another way to use Observables, subscribe to the select change event
 * then load specific employee expenses for subsequent selection
 */
 onPickEmployee(): void {
 this.formSubscription = this.generatorForm
 .get('employeeid')
 ?.valueChanges.subscribe((val) => {
 this.selectedExpense = {
 id: 0,
 employeeid: 0,
 categoryid: '',
 description: '',
 amount: 0.0,
 dateincurred: '',
 receipt: false,
 receiptscan: '',
 };
 this.selectedEmployee = val;
 this.loadEmployeeExpenses();
 this.pickedExpense = false;
 this.hasExpenses = false;
 this.msg = 'choose expense for employee';
 this.pickedEmployee = true;
 this.generated = false;
 this.items = []; // array for the report
 this.selectedexpenses = []; // array for the details in app html
 });
 } // onPickEmployee
 /**
 * onPickExpense - subscribe to the select change event then
 * update array containing items.
 */
 onPickExpense(): void {
 const expenseSubscription = this.generatorForm
 .get('expenseid')
 ?.valueChanges.subscribe((val) => {
 this.selectedExpense = val;
 const item: ReportItem = {
 id: 0,
 reportid: 0,
 expenseid: this.selectedExpense?.id,
 };
 if (
 this.items.find((item) => item.expenseid === this.selectedExpense?.id)
 ) {
 // ignore entry
 } else {
 // add entry
 this.items.push(item);
 this.selectedexpenses.push(this.selectedExpense);
 }
 if (this.items.length > 0) {
 this.hasExpenses = true;
 }
 this.total = 0.0;
 this.selectedexpenses.forEach((exp) => (this.total += exp.amount));
 });
 this.formSubscription?.add(expenseSubscription); // add it as a child, so all can be destroyed together
 } // onPickExpense
 /**
 * loadEmployeeExpenses - filter for a particular employee's expenses
 */
 loadEmployeeExpenses(): void {
 this.employeeexpenses$ = this.expenses$?.pipe(
 map((expenses) =>
 // map each expense in the array and check whether or not it belongs to selected employee
 expenses.filter(
 (expense) => expense.employeeid === this.selectedEmployee?.id
 )
 )
 );
 } // loadEmployeeExpenses
 /**
 * createReport - create the client side report
 */
 createReport(): void {
 this.generated = false;
 const report: Report = {
 id: 0,
 items: this.items,
 employeeid: this.selectedExpense.employeeid,
 };
 this.reportService.add(report).subscribe({
 // observer object
 next: (report: Report) => {
 // server should be returning report with new id
 report.id > 0
 ? (this.msg = `Report ${report.id} added!`)
 : (this.msg = 'Report not added! - server error');
 this.reportno = report.id;
 },
 error: (err: Error) => (this.msg = `Report not added! - ${err.message}`),
 complete: () => {
 this.hasExpenses = false;
 this.pickedEmployee = false;
 this.pickedExpense = false;
 this.generated = true;
 },
 });
 } // createReport
 viewPdf(): void {
    window.open(`${PDFURL}${this.reportno}`, '');
    } // viewPdf   
} // GeneratorComponent