import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatComponentsModule } from '../mat-components/mat-components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ExpenseHomeComponent } from './expense-home/expense-home.component';
import { ExpenseDetailComponent } from './expense-detail/expense-detail.component';



@NgModule({
  declarations: [
    ExpenseHomeComponent,
    ExpenseDetailComponent
  ],
  imports: [
    CommonModule,
    MatComponentsModule,
    ReactiveFormsModule,
  ]
})
export class ExpenseModule { }
