import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProfileViewModel } from 'src/app/Interface/ProfileViewModel';
import { Role } from 'src/app/Interface/Role';
import { RoleDto } from 'src/app/Interface/RolesDTO';
import { API_ENDPOINTS, baseUrl } from 'src/app/app-constants';
import { AppService } from 'src/app/shared/services/app-service/app.service';

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.css']
})
export class CreateProfileComponent implements OnInit {
  profileObj: ProfileViewModel = {
    profileName: "",
    profileDescription: " ",
    roleIds: []
  }
  //fetch all roles using role service
  allRoles: Role[] = [];


  rolesFoundInProfileObj = [];

  finalRoleDtoToShow: RoleDto[] = [];//to store checked and unchecked roles both
  //tempRoleDto:RoleDto={};
  profiles = [];
  profileUpdated: any;
  parentIdRes: any;
  constructor(private appService: AppService,
    private toastrService: ToastrService,
    private router: Router) {

  }
  ngOnInit() {
    this.getRoles();

  }
  getRoles() {
    const apiUrl = baseUrl + API_ENDPOINTS.roles.getRoles;
    let roleData: Role[] = [];
    this.appService.get(apiUrl).subscribe(res => {
      roleData = res.results;
      //  this.finalRoleDtoToShow = res.results;
      roleData.forEach(element => {
        this.finalRoleDtoToShow.push({ id: element.roleId, name: element.roleName })
      });
      console.log(this.finalRoleDtoToShow);
    })

  }
  onChange() {
    console.log("on change called");
    console.log(this.profileObj);
    //console.log(this.finalRoleDtoToShow)
  }

  onSubmit(event: NgForm) {
    console.log("submit invoked")

    const tempRoleStringArr = [];

    for (let role of this.finalRoleDtoToShow) {
      if (role.checked) {
        tempRoleStringArr.push(role.id);

      }
    }
   

    this.profileObj.roleIds=tempRoleStringArr;
    // this.profileService.setDummyProfile(this.profiles);

    // console.log("updated profiles list is ");
    // console.log(this.profileService.getDummyProfile());
    const apiUrl = baseUrl + API_ENDPOINTS.profile.addProfile;
    this.appService.post(apiUrl, this.profileObj).subscribe(res => {
      this.toastrService.success('Profile Created successfully!', 'Success');
      this.router.navigate(['admin', 'profile', 'list']);
    },err=>{
      this.toastrService.error(err.error)
    })



  }
  redirectToList() {
    this.router.navigate(['admin','profile','list']);
  }
}
