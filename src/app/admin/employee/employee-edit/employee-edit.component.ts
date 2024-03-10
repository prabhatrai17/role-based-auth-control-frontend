import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { API_ENDPOINTS, baseUrl, roleDataColumnsEmployeeSide } from 'src/app/app-constants';
import { DataTableComponent } from 'src/app/shared/components/data-table/data-table.component';
import { AppService } from 'src/app/shared/services/app-service/app.service';
import { ProfileTableComponent } from '../../profile/profile-table/profile-table.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {
  userData: any;
  formDisabled = true;
  profileId: any;
  isSpinnerActive = false;
  rolesData = [];
  profileData = null;
  rolesColumns = roleDataColumnsEmployeeSide;
  editFormData: FormGroup = new FormGroup({});
  constructor(private appService: AppService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private dialogService: DialogService,
    private dialogref: DynamicDialogRef,
    private toastrService: ToastrService
  ) {
    this.editFormData = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        username: ['', [Validators.required]],
        userId: '',
        profileId: ['', Validators.required],

      });
  }
  ngOnInit(): void {
    let queryString = '';
    let userId = ''
    if (this.route.snapshot.params.hasOwnProperty('id')) {
      userId = `${this.route.snapshot.paramMap.get('id')}`;
    }
    queryString = queryString + '?userId=' + userId;
    const apiurl = baseUrl + API_ENDPOINTS.user.getUser + queryString
    this.appService.get(apiurl).subscribe(res => {
      // this.profileId = 
      this.editFormData.patchValue(res.data);
      if (res.data.profile && res.data.profile.hasOwnProperty('profileId') && res.data.profile[`profileId`] !== null) {
        this.profileId = res.data.profile[`profileId`];
        this.editFormData.get('profileId').setValue(res.data.profile[`profileId`]);
        this.rolesData = res.data.profile.roles;
        this.profileData = res.data.profile;
      }
    })
  }
  profileDialog() {

    this.dialogref = this.dialogService.open(ProfileTableComponent, {
      styleClass: 'dialog-style',
      width: '70%',
      height: '70%',
      header: this.profileId > 0 ? 'Change Profile' : 'Add Profile',
      data: {
        enableCreateProfile: false,
        profileId: this.profileId
      }
    });
    this.dialogref.onClose.subscribe(res => {
      console.log(res.rowData)
      this.profileId = res.rowData.profileId;
      this.profileData = res.rowData;
      // if (res.rowData.hasOwnProperty('roles')) {
      //   this.rolesData = res.rowData.roles;
      // }
      this.rolesData = res.rowData.roleListData;
      this.editFormData.get('profileId')?.setValue(this.profileId);
    }, (err => {
      console.log(err);
      this.toastrService.error(err.errorMsg)
    }));

  }
  redirectToListPage() {
    this.router.navigate(['admin', 'employee', 'list']);
  }
  submit() {
    console.log(this.editFormData)
    if (this.editFormData.status === 'VALID') {
      this.isSpinnerActive = true;
      const apiUrl = baseUrl + API_ENDPOINTS.user.updatRole;
      const requestBody = { userId: this.editFormData.get('userId').value, ProfileId: this.profileId };
      this.appService.patch(apiUrl, requestBody).subscribe(res => {
        console.log(res);
        this.toastrService.success('User Details updated successfully!', 'Success');
        this.router.navigate(['admin', 'employee', 'view', this.editFormData.get('userId').value]);
        this.isSpinnerActive = false;

      }, (error) => {
        console.log(error);
        this.toastrService.error(error.errorMsg);
        this.router.navigate(['admin', 'employee', 'view', this.editFormData.get('userId').value]);
        this.isSpinnerActive = false;

      })

    }
  }
}
