import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
 } from '@angular/forms';
 import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
 import { Expense } from '@app/expense/expense';
 import { Employee } from '@app/employee/employee';
import { ValidateDecimal } from '@app/validators/decimal.validator';
import { DeleteDialogComponent } from '@app/delete-dialog/delete-dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

 @Component({
  selector: 'app-expense-detail',
  templateUrl: 'expense-detail.component.html',
 })
 export class ExpenseDetailComponent implements OnInit {
  // setter
  @Input() selectedExpense: Expense = {
  id: 0,
  employeeid: 0,
  categoryid: '',
  description: '',
  amount: 0.0,
  dateincurred: '',
  receipt: false,
  receiptscan: '',
  };
  @Input() employees: Employee[] | null = null;
  @Output() cancelled = new EventEmitter();
  @Output() saved = new EventEmitter();
  @Output() deleted = new EventEmitter();
  expenseForm: FormGroup;
  employeeid: FormControl;
  categoryid: FormControl;
  description: FormControl;
  amount: FormControl;
  receipt: FormControl;
  dateincurred: FormControl;
  constructor(private builder: FormBuilder, private dialog: MatDialog) {
  this.employeeid = new FormControl(
  '',
  Validators.compose([Validators.required])
  );
  this.categoryid = new FormControl(
  '',
  Validators.compose([Validators.required])
  );
  this.description = new FormControl(
  '',
  Validators.compose([Validators.required])
  );
  this.amount = new FormControl(
  '',
  Validators.compose([Validators.required, ValidateDecimal])
  );
  this.receipt = new FormControl(
  '',
  Validators.compose([Validators.required])
  );
  this.dateincurred = new FormControl(
  '',
  Validators.compose([Validators.required])
  );
  this.expenseForm = this.builder.group({
  employeeid: this.employeeid,
  categoryid: this.categoryid,
  description: this.description,
  amount: this.amount,
  receipt: this.receipt,
  dateincurred: this.dateincurred,
  });
  } // constructor
  ngOnInit(): void {
  // patchValue doesn't care if all values are present
  this.expenseForm.patchValue({
  employeeid: this.selectedExpense.employeeid,
  categoryid: this.selectedExpense.categoryid,
  description: this.selectedExpense.description,
  amount: this.selectedExpense.amount,
  receipt: this.selectedExpense.receipt,
  dateincurred: this.selectedExpense.dateincurred,
  });
  } // ngOnInit
  updateSelectedExpense(): void {
  this.selectedExpense.employeeid = this.expenseForm.value.employeeid;
  this.selectedExpense.categoryid = this.expenseForm.value.categoryid;
  this.selectedExpense.description = this.expenseForm.value.description;
  this.selectedExpense.amount = this.expenseForm.value.amount;
  this.selectedExpense.receipt = this.expenseForm.value.receipt;
  this.selectedExpense.dateincurred = this.expenseForm.value.dateincurred;
  this.saved.emit(this.selectedExpense);
  } // updateSelectedExpense
  selectFile(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList) {
    const file = fileList[0];
    const reader: FileReader = new FileReader();
    reader.onloadend = (e) => {
    this.selectedExpense.receiptscan = reader.result;
    };
    reader.readAsDataURL(file);
    }
    } // selectFile
    setReceipt(): void {
    this.selectedExpense.receipt = !this.selectedExpense.receipt;
    } // setReceipt
    openDeleteDialog(selectedExpense: Expense): void {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = false;
      dialogConfig.data = {
      title: `Delete Expense ${this.selectedExpense.id}`,
      entityname: 'expense'
      };
      dialogConfig.panelClass = 'customdialog';
      const dialogRef = this.dialog.open(DeleteDialogComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(result => {
      if (result) {
      this.deleted.emit(this.selectedExpense);
      }
      });
      } // openDeleteDialog
 } // ExpenseDetailComponent
 