import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuardService } from 'src/app/shared/services/AuthGuard/auth-guard.service';
import { LoaderService } from 'src/app/shared/services/loader-service/loader.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  
  name:string;
  dashboardContents = [
    {
      name: 'totalUsers',
      label: 'Active Users',
      icon: 'bi bi-person',
      url: '/admin/employee/list'
      
    },
    {
      name: 'totalApplications',
      label: 'Applications',
      icon: 'bi bi-grid',
      url:'/admin/viewApplications'
      
    },
    {
      name: 'profiles',
      label: 'Total profiles',
      icon: 'bi bi-person-lines-fill',
      url:'/admin/profile/list'
      
    },
    {
      name: 'roles',
      label: 'Total roles',
      icon: 'bi bi-person-fill-gear',
      url: '/admin/role/list'
      
      
    }
  ];
  constructor(private loaderService: LoaderService,private authService:AuthGuardService,private route:Router) {
            
    this.loaderService.setLoader(false)
    console.log("admin page");
    const index=this.authService.getLoginCredentials().username.indexOf("@");
    this.name=this.authService.getLoginCredentials().username.substring(0,index);
  }
  
  navigate(url){
    this.route.navigateByUrl(url);
  }
}
