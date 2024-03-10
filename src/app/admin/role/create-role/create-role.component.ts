import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Role } from 'src/app/Interface/Role';
import { API_ENDPOINTS, baseUrl } from 'src/app/app-constants';
import { AppService } from 'src/app/shared/services/app-service/app.service';

@Component({
  selector: 'app-create-role',
  templateUrl: './create-role.component.html',
  styleUrls: ['./create-role.component.css']
})
export class CreateRoleComponent {
  roleNewObj: Role = {
    roleName: '',
    roleDescription: ''
  };
  invalidInputGiven = false;
 
  constructor(
    private toastrService: ToastrService, private appService: AppService, private router: Router
  ) {

  }
  onChange() {
    console.log("on change called");
    console.log(this.roleNewObj);

  }
  onSubmit(event: NgForm) {
    console.log("submit invoked")
    console.log(event);
    if (this.roleNewObj.roleName == undefined || this.roleNewObj.roleName == undefined) {
      this.invalidInputGiven = true;
    }
    

    console.log(this.roleNewObj)
    const apiUrl = baseUrl + API_ENDPOINTS.roles.getRoles;
    this.appService.post(apiUrl, this.roleNewObj).subscribe(res => {
      this.toastrService.success('Role created successfully!', 'Success');
      this.router.navigate(['admin', 'role', 'list']);
    },err=>{
      this.toastrService.error(err.error)
    })
    // this.roleService.setDummyRoles(this.dummyRoles);
    // console.log("final roles list after added")
    // console.log(this.roleService.getDummyRoles());
  }
  redirectToList() {
    this.router.navigate(['admin', 'role', 'list']);
  }
}
