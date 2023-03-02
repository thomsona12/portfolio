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
 templateUrl: './viewer.component.html',
})
export class ViewerComponent implements OnInit, OnDestroy {
 // form
 viewerForm: FormGroup;
 employeeid: FormControl;
 reportid: FormControl;
 // data
 formSubscription?: Subscription;
 reports$?: Observable<Report[]>; // everybody's expenses
 employees$?: Observable<Employee[]>; // all employees
 employeereports$?: Observable<Report[]>; // all expenses for a particular employee
 items: Array<ReportItem>; // expense items that will be in report
 selectedReports: Report[]; // expenses that being displayed currently in app
 selectedReport: Report; // the current selected expense
 employeeExpenses?: Expense[]; // expenses for selected employee
 employeeReports?: Report[]; // expenses for selected employee
 reportExpenses?: Expense[]; // expenses matching report items keys
 selectedEmployee: Employee; // the current selected employee
 // misc
 pickedReport: boolean;
 pickedEmployee: boolean;
 generated: boolean;
 hasReports: boolean;
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
 this.pickedReport = false;
 this.generated = false;
 this.msg = '';
 this.employeeid = new FormControl('');
 this.reportid = new FormControl('');
 this.viewerForm = this.builder.group({
 reportid: this.reportid,
 employeeid: this.employeeid,
 });
 this.selectedReport = {
 id: 0,
 employeeid: 0,
 items: [],
 datecreated: '',
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
 this.selectedReports = new Array<Report>();
 this.hasReports = false;
 this.total = 0.0;
 } // constructor
 ngOnInit(): void {
 this.onPickEmployee();
 this.onPickReport();
 this.msg = 'loading employees and reports from server...';
 (this.employees$ = this.employeeService.get()),
 catchError((err) => (this.msg = err.message));
 (this.reports$ = this.reportService.get()),
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
 this.formSubscription = this.viewerForm
 .get('employeeid')
 ?.valueChanges.subscribe((val) => {
 this.selectedReport = {
  id: 0,
  employeeid: 0,
  items: [],
  datecreated: '',
 };
 this.selectedEmployee = val;
 this.loadEmployeeReports();
 this.loadEmployeeExpenses(this.selectedEmployee.id);
 this.pickedReport = false;
 this.hasReports = false;
 this.msg = 'choose report for employee';
 this.pickedEmployee = true;
 this.generated = false;
 this.items = []; // array for the report
 this.selectedReports = []; // array for the details in app html
 });
 } // onPickEmployee
 /**
 * onPickExpense - subscribe to the select change event then
 * update array containing items.
 */
 onPickReport(): void {
 const expenseSubscription = this.viewerForm
 .get('reportid')
 ?.valueChanges.subscribe((val) => {
 this.selectedReport = val;
 const item: ReportItem = {
 id: 0,
 reportid: this.selectedReport?.id,
 expenseid: 0,
 };
 if (
 this.items.find((item) => item.reportid === this.selectedReport?.id)
 ) {
 // ignore entry
 } else {
 // add entry

 this.items.push(item);
 // retrieve just the expenses in the report
 if (this.employeeExpenses !== undefined) {
  this.reportExpenses = this.employeeExpenses.filter((expense) =>
  this.selectedReport?.items.some((item) => item.expenseid === expense.id)
  );
  } 
 }
 if (this.items.length > 0) {
 this.hasReports = true;
 this.generated=true;
 }
 this.total = 0.0;
 this.reportExpenses?.forEach((rep) => (this.total += rep.amount));
 this.reportno=this.selectedReport.id;
 });
 this.formSubscription?.add(expenseSubscription); // add it as a child, so all can be destroyed together
 } // onPickExpense
 loadEmployeeReports(): void {
  this.employeereports$ = this.reports$?.pipe(
    map((reports) =>
    // map each expense in the array and check whether or not it belongs to selected employee
    reports.filter(
    (reports) => reports.employeeid === this.selectedEmployee?.id
    )
    )
    );
  }
   // loadEmployeeExpenses
 /**
 * loadEmployeeExpenses - obtain a particular employee's expenses
 * we'll match the report expenses to them later
 */
  loadEmployeeExpenses(id: number): void {
    // expenses aren't part of the page, so we don't use async pipe here
    this.msg = 'loading expenses...';
    this.expenseService
    .getSome(id)
    .subscribe((expenses) => (this.employeeExpenses = expenses));
    }
   
 /**
 * createReport - create the client side report
 */
 viewPdf(): void {
    window.open(`${PDFURL}${this.reportno}`, '');
    } // viewPdf   
    
} // ViewerComponent