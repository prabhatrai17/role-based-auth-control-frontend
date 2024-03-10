import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ActivatedRoute, Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Role } from 'src/app/Interface/Role';
import { API_ENDPOINTS, baseUrl } from 'src/app/app-constants';
import { AppService } from 'src/app/shared/services/app-service/app.service';


@Component({
  selector: 'app-edit-roles',
  templateUrl: './role-edit.component.html',
  styleUrls: ['./role-edit.component.css']
})
export class EditRoleComponent {

  constructor(private route:ActivatedRoute, private appService:AppService,private toastrService:ToastrService,private router:Router){}
  roleIdRec:number;
  
  roleToEdited:Role={
    roleId:0,
    roleName: '',
    roleDescription: ''
  };

  ngOnInit(){
    this.roleIdRec=this.route.snapshot.params['id'];
    console.log("role id recieved");
    console.log(this.roleIdRec);
    this.appService.get(baseUrl+API_ENDPOINTS.roles.getRoles+this.roleIdRec).subscribe(
      (res)=>{
        this.roleToEdited=res.results;
      }
      ,err=>{
        this.toastrService.error(err.error)
      })

  }

  role:Role={
    roleName: '',
    roleDescription: ''
  };

  onChange(){
    console.log("on change called");
     console.log(this.roleToEdited);
    
  }

  onSubmit(event:NgForm){
    console.log("submit invoked")
   console.log(event.value);

  //  console.log(this.roleToEdited==event.value)
  //  console.log(this.roleToEdited)
  //  console.log(event.value)

  

   //calling role service to update role list dummy/backend
   if(event.valid){
    this.appService.put(baseUrl+API_ENDPOINTS.roles.getRoles+this.roleIdRec,event.value).subscribe(
      (res)=>{
        console.log(res);
        this.toastrService.success("edited role successfully");
        this.router.navigateByUrl('/admin/role/list')
        
      }
      ,err=>{
        this.toastrService.error(err.error)
      })
   }
  }
  redirectToList() {
    this.router.navigate(['admin', 'role', 'list']);
  }
 

}
