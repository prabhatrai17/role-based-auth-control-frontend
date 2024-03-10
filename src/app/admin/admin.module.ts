import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { SharedComponentsModule } from '../shared/components/shared-components.module';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeTableComponent } from './employee/employee-table/employee-table.component';
import { CardModule } from 'primeng/card';
import { ProfileTableComponent } from './profile/profile-table/profile-table.component';
import { ProfileEditComponent } from './profile/profile-edit/profile-edit.component';
import { RoleTableComponent } from './role/role-table/role-table.component';
import { EditRoleComponent } from './role/role-edit/role-edit.component';
import { CreateProfileComponent } from './profile/create-profile/create-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogService, DynamicDialogConfig, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmDialogComponent } from '../shared/components/confirm-dialog/confirm-dialog.component';
import { ViewApplicationsComponent } from './ApplicationComponent/view-applications/view-applications.component';
import { AddApplicationComponent } from './ApplicationComponent/add-application/add-application.component';
import { EditApplicationComponent } from './ApplicationComponent/edit-application/edit-application.component';
import { DeleteApplicationComponent } from './ApplicationComponent/delete-application/delete-application.component';
import { SearchPipe } from './ApplicationComponent/view-applications/searchPipe';
import { AddUserProfileComponent } from './userprofile/add-user-profile/add-user-profile.component';
import { ViewUserProfileComponent } from './userprofile/view-user-profile/view-user-profile.component';
import { ProfileUserListComponent } from './userprofile/profile-user-list/profile-user-list.component';
import { CreateRoleComponent } from './role/create-role/create-role.component';
import { EmployeeViewComponent } from './employee/employee-view/employee-view.component';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { EmployeeEditComponent } from './employee/employee-edit/employee-edit.component';
const routes: Routes = [
  {
    path: '',
    component: AdminDashboardComponent,

  },
  {
    path: 'employee/list',
    component: EmployeeTableComponent
  },
  {
    path: 'employee/edit/:id',
    component: EmployeeEditComponent
  },
  {
    path: 'employee/view/:id',
    component: EmployeeViewComponent
  },
  {
    path: 'profile/list',
    component: ProfileTableComponent
  },
  {
    path: 'role/list',
    component: RoleTableComponent
  },
  {
    path: 'profile/edit/:id',
    component: ProfileEditComponent
  },
  {
    path: 'profile/create',
    component: CreateProfileComponent
  },
  {
    path: 'role/edit/:id',
    component: EditRoleComponent
  },
  {
    path: 'role/create',
    component: CreateRoleComponent
  },
  { path: "viewApplications", component: ViewApplicationsComponent },
  { path: "addApplication", component: AddApplicationComponent },
  { path: "editApplication/:id", component: EditApplicationComponent },
  { path: "deleteApplication/:id", component: DeleteApplicationComponent },
  { path: "viewUserProfiles", component: ViewUserProfileComponent },
  { path: 'profileWithUser/:profile', component: ProfileUserListComponent },
  { path: 'updateUserProfile', component: AddUserProfileComponent },
]

@NgModule({
  declarations: [
    AdminDashboardComponent,
    EmployeeTableComponent,
    EmployeeEditComponent,
    ProfileTableComponent,
    ProfileEditComponent,
    CreateProfileComponent,
    ViewApplicationsComponent,
    AddApplicationComponent,
    EditApplicationComponent,
    DeleteApplicationComponent,
    SearchPipe,
    AddUserProfileComponent,
    ViewUserProfileComponent,
    ProfileUserListComponent,
    EditRoleComponent,
    RoleTableComponent,
    CreateRoleComponent,
    EmployeeViewComponent

  ],
  imports: [
    CommonModule,
    SharedComponentsModule,
    RouterModule.forChild(routes),
    CardModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatCheckboxModule,


  ],
  exports: [], providers: [DialogService, DynamicDialogRef, DynamicDialogConfig]
})
export class AdminModule { }
