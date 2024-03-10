import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationsContainerComponent } from './applications-container/applications-container.component';
import { RouterModule, Routes } from '@angular/router';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';

const routes: Routes = [{ path: 'application/list', component: ApplicationsContainerComponent }]

@NgModule({
  declarations: [
    ApplicationsContainerComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CardModule,
    CheckboxModule
  ]
})
export class UserModule { }
