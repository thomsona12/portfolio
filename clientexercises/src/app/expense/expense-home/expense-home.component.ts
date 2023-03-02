import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Expense } from '@app/expense/expense';
import { Employee } from '@app/employee/employee';
import { EmployeeService } from '@app/employee/employee.service';
import { ExpenseService } from '@app/expense/expense.service';
import { MatPaginator } from '@angular/material/paginator';
@Component({
 templateUrl: 'expense-home.component.html',
})
export class ExpenseHomeComponent implements OnInit, AfterViewInit{
 // Observables
 employees$?: Observable<Employee[]>; // for employee drop down
 expenseDataSource$?: Observable<MatTableDataSource<Expense>>; // for MatTable
 // misc.
 expense: Expense;
 hideEditForm: boolean;
 size: number = 0;
 msg: string;
 // MatPaginator
 length = 0;
 pageSize = 8;
 @ViewChild(MatPaginator) paginator?: MatPaginator;
 // sort stuff
 displayedColumns: string[] = ['id', 'dateincurred', 'employeeid'];
 dataSource: MatTableDataSource<Expense> = new MatTableDataSource<Expense>();
 @ViewChild(MatSort) sort: MatSort;
 constructor(
 private employeeService: EmployeeService,
 private expenseService: ExpenseService
 ) {
 this.hideEditForm = true;
 this.expense = {
 id: 0,
 employeeid: 0,
 categoryid: '',
 description: '',
 amount: 0.0,
 dateincurred: '',
 receipt: false,
 receiptscan: '',
 };
 this.msg = '';
 this.sort = new MatSort();
 } // constructor
 ngOnInit(): void {
 (this.expenseDataSource$ = this.expenseService.get().pipe(
 map((expenses) => {
 const dataSource = new MatTableDataSource<Expense>(expenses);
 this.dataSource.data = expenses;
 this.dataSource.sort = this.sort;
 if (this.paginator !== undefined) {
 this.dataSource.paginator = this.paginator;
 }
 return dataSource;
 })
 )),
 catchError((err) => (this.msg = err.message));
 } // ngOnInit
 ngAfterViewInit(): void {
 // loading employees later here
 // because timing issue with cypress testing in OnInit
 (this.employees$ = this.employeeService.get()),
 catchError((err) => (this.msg = err.message));
 } // ngAfterInit
 select(selectedExpense: Expense): void {
 this.expense = selectedExpense;
 this.msg = `Expense ${selectedExpense.id} selected`;
 this.hideEditForm = !this.hideEditForm;
 } // select
 /**
 * cancelled - event handler for cancel button
 */
 cancel(msg?: string): void {
 this.hideEditForm = !this.hideEditForm;
 this.msg = 'operation cancelled';
 } // cancel
 /**
 * update - send changed update to service update local array
 */
 update(selectedExpense: Expense): void {
 this.expenseService.update(selectedExpense).subscribe({
 // observer object
 next: (exp: Expense) => (this.msg = `Expense ${exp.id} updated!`),
 error: (err: Error) => (this.msg = `Update failed! - ${err.message}`),
 complete: () => {
 this.hideEditForm = !this.hideEditForm;
 },
 });
 } // update
 /**
 * save - determine whether we're doing and add or an update
 */
 save(expense: Expense): void {
 expense.id ? this.update(expense) : this.add(expense);
 } // save
 /**
 * add - send expense to service, receive newid back
 */
 add(newExpense: Expense): void {
 this.msg = 'Adding expense...';
 this.expenseService.add(newExpense).subscribe({
 // observer object
 next: (exp: Expense) => {
 this.msg = `Expense ${exp.id} added!`;
 },
 error: (err: Error) => (this.msg = `Expense not added! - ${err.message}`),
 complete: () => {
 this.hideEditForm = !this.hideEditForm;
 },
 });
 } // add
 /**
 * delete - send expense id to service for deletion
 */
 delete(selectedExpense: Expense): void {
 this.expenseService.delete(selectedExpense.id).subscribe({
 // observer object
 next: (numOfExpensesDeleted: number) => {
 numOfExpensesDeleted === 1
 ? (this.msg = `Expense ${selectedExpense.id} deleted!`)
 : (this.msg = `Expense ${selectedExpense.id} not deleted!`);
 },
 error: (err: Error) => (this.msg = `Delete failed! - ${err.message}`),
 complete: () => {
 this.hideEditForm = !this.hideEditForm;
 },
 });
 } // delete
 /**
 * newExpense - create new expense instance
 */
 newExpense(): void {
 this.expense = {
 id: 0,
 employeeid: 0,
 categoryid: '',
 description: '',
 amount: 0.0,
 dateincurred: '',
 receipt: false,
 receiptscan: '',
 };
 this.msg = 'New expense';
 this.hideEditForm = !this.hideEditForm;
 } // newExpense
 sortExpensesWithObjectLiterals(sort: Sort): void {
 const literals = {
 // sort on id
 id: () =>
 (this.dataSource.data = this.dataSource.data.sort(
 (a: Expense, b: Expense) =>
 sort.direction === 'asc' ? a.id - b.id : b.id - a.id // descending
 )),
 // sort on employeeid
 employeeid: () =>
 (this.dataSource.data = this.dataSource.data.sort(
 (a: Expense, b: Expense) =>
 sort.direction === 'asc'
 ? a.employeeid - b.employeeid
 : b.employeeid - a.employeeid // descending
 )),
 // sort on dateincurred
 dateincurred: () =>
 (this.dataSource.data = this.dataSource.data.sort(
 (a: Expense, b: Expense) =>
 sort.direction === 'asc'
 ? a.dateincurred < b.dateincurred
 ? -1
 : 1
 : b.dateincurred < a.dateincurred // descending
 ? -1
 : 1
 )),
 };
 literals[sort.active as keyof typeof literals]();
 } // sortExpensesWithObjectLiterals
} // ExpenseHomeComponent
