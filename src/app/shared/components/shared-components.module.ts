import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './spinner/spinner.component';
import { PasswordValidatorComponent } from './password-validator/password-validator.component';
import { SpinButtonComponent } from './spin-button/spin-button.component';
import { DataTableComponent } from './data-table/data-table.component';
import { TableModule } from 'primeng/table';
import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component';
import { SidebarModule } from 'primeng/sidebar';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';


@NgModule({
  declarations: [
    SpinnerComponent,
    PasswordValidatorComponent,
    SpinButtonComponent,
    DataTableComponent,
    AdminNavbarComponent,
    ConfirmDialogComponent,

  ],
  imports: [
    CommonModule,
    TableModule,
    SidebarModule,
    DynamicDialogModule,
    DialogModule,
    DropdownModule
  ],
  exports: [
    SpinnerComponent,
    PasswordValidatorComponent,
    SpinButtonComponent,
    DataTableComponent,
    AdminNavbarComponent,
    ConfirmDialogComponent
  ], providers: [DynamicDialogModule,DialogModule]
})
export class SharedComponentsModule { }
