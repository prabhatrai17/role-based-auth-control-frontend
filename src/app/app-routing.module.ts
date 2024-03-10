import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './Guards/auth.guard';

const routes: Routes = [{
  path: 'account', loadChildren: () => import('./account/account.module').then(mod => mod.AccountModule)
},
{
  path: 'admin',
  canActivate:[AuthGuard],
  loadChildren: () => import('./admin/admin.module').then(mod => mod.AdminModule)
},
{
  path: 'user',
  canActivate:[AuthGuard],
  loadChildren: () => import('./user/user.module').then(mod => mod.UserModule)
},
{
  path: '', redirectTo:'account',pathMatch:'full'
}

  
 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
