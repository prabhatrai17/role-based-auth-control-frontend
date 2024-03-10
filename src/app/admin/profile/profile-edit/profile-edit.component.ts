import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Role } from 'src/app/Interface/Role';
import { RoleDto } from 'src/app/Interface/RolesDTO';
import { API_ENDPOINTS, baseUrl } from 'src/app/app-constants';
import { AppService } from 'src/app/shared/services/app-service/app.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent {

  profileObj: any = {
    profileId: "",
    profileName: "",
    profileDescription: " ",
    roles: []
  }
  //fetch all roles using role service
  allRoles: Role[];


  rolesFoundInProfileObj = [];

  finalRoleDtoToShow: RoleDto[] = [];//to store checked and unchecked roles both
  //tempRoleDto:RoleDto={};
  profiles = [];
  profileUpdated: any;
  parentIdRes: any;
  constructor(private appService: AppService,
    private toastrService: ToastrService,
    private router: Router,
    private route: ActivatedRoute) { }
  ngOnInit() {
    this.getRoles();

  }
  getProfile() {
    let profileId = '';
    if (this.route.snapshot.params.hasOwnProperty('id')) {
      profileId = `${this.route.snapshot.paramMap.get('id')}`;
    }

    const apiUrl = baseUrl + API_ENDPOINTS.profile.getProfilebyId + profileId;
    this.appService.get(apiUrl).subscribe(res => {
      this.profileObj = res; console.log('finalDTO', this.finalRoleDtoToShow)
      this.finalRoleDtoToShow.forEach((element, index) => {
        if (this.profileObj.roles.findIndex(ele => ele.roleId === element.id) !== -1) {
          console.log('hi')
          this.finalRoleDtoToShow[index].checked = true
        } console.log('hiw')

      })
    },err=>{
      this.toastrService.error(err.error)
    })
  }
  getRoles() {
    const apiUrl = baseUrl + API_ENDPOINTS.roles.getRoles;
    let roleData: Role[] = [];
    this.appService.get(apiUrl).subscribe(res => {
      roleData = res.results;
      roleData.forEach(element => {
        this.finalRoleDtoToShow.push({ id: element.roleId, name: element.roleName })
      });
      console.log(this.finalRoleDtoToShow);
      this.getProfile();

    },err=>{
      this.toastrService.error(err.error)
    })

  }

  onChange() {
    console.log("on change called");
    console.log(this.profileObj);
    console.log(this.finalRoleDtoToShow)
  }

  onSubmit(event: NgForm) {
    console.log("submit invoked")

    const tempRoleStringArr = [];
    for (let role of this.finalRoleDtoToShow) {
      if (role.checked)
        tempRoleStringArr.push(role.id)
    }
    let profileRequestBody = {
      profileName: this.profileObj.profileName,
      profileDescription: this.profileObj.profileDescription,
      roleIds: tempRoleStringArr
    }
    const apiUrlLink = baseUrl + API_ENDPOINTS.profile.getProfilebyId + this.profileObj.profileId;
    this.appService.put(apiUrlLink, profileRequestBody).subscribe(res => {
      console.log(res);
      this.toastrService.success('Profile updated successfully!', 'Success');
      this.router.navigate(['admin', 'profile', 'list']);
    },err=>{
      this.toastrService.error(err.error)
    })


    // this.profileObj.roles = tempRoleStringArr;
    // console.log(this.profileObj);

    // for (let profile of this.profiles) {
    //   if (profile.profileId == this.profileObj.profileId) {
    //     profile = this.profileObj;
    //   }
    // }

  }
  redirectToList() {
    this.router.navigate(['admin', 'profile', 'list']);
  }
}
