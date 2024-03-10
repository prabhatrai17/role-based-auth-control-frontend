import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Dialog } from 'primeng/dialog';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { API_ENDPOINTS, baseUrl, profileDataColumns, profileDataColumnsEmployeeSide } from 'src/app/app-constants';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { AppService } from 'src/app/shared/services/app-service/app.service';
import { LoaderService } from 'src/app/shared/services/loader-service/loader.service';

@Component({
  selector: 'app-profile-table',
  templateUrl: './profile-table.component.html',
  styleUrls: ['./profile-table.component.css']
})
export class ProfileTableComponent {
  profilesData: any[] = [];
  profilesViewOnly: any[] = [];
  noProfileFound = false

  profileColumns: any[] = [];
  loadData = false;
  dialogConfig: any
  constructor(private appService: AppService,
    private loaderSrvice: LoaderService,
    private router: Router,
    private toastrService: ToastrService,
    public config: DynamicDialogConfig,
    private dialogref: DynamicDialogRef,
    private dialogService: DialogService,) {

  }
  ngOnInit() {
    this.getProfiles();
  }
  getProfiles() {
    this.dialogConfig = this.config;

    const apiUrl = baseUrl + API_ENDPOINTS.profile.getAllProfiles;
    this.loadData = true;
    if (!this.config.data) {
      this.loaderSrvice.setLoader(true);
      this.profileColumns = profileDataColumns;
    }
    //  this.loaderSrvice.setLoader(true);
    this.appService.get(apiUrl).subscribe(res => {
      this.loaderSrvice.setLoader(false);
      this.profilesData = this.modifyProfileData(res);
      if (this.config.data) {
        this.profileColumns = profileDataColumnsEmployeeSide;

      }
      if (this.config.data && this.config.data.profileId && this.config.data.profileId > 0) {
        let dialogProfileList = res.filter((ele: { profileId: number; }) => ele.profileId !== this.config.data.profileId);
        this.profilesData = this.modifyProfileData(dialogProfileList)
      }
      this.loadData = false;

    })
  }
  modifyProfileData(data: any[]) {
    let updatedData: any[] = []
    for (let pdata of data) {
      let roleNames = pdata.roles.map((role) => role.roleName).join(",");
      updatedData.push({
        "profileId": pdata.profileId,
        "profileName": pdata.profileName,
        "profileDescription": pdata.profileDescription,
        "roles": roleNames,
        "roleListData": pdata.roles
      })
      
        
    }
    return updatedData;
  }
  buttonClickMethod(event: any) {
    switch (event.action) {
      case 'edit':
        this.router.navigate(['admin', 'profile', 'edit', event.rowData.profileId]);
        break;
      case 'assign':
        this.dialogref.close({ rowData: event.rowData });
        break;
      case 'delete':
        console.log('delete')
        console.log(event.rowData)
     this.dialogref =   this.dialogService.open(ConfirmDialogComponent, {
          header: 'Delete',
          data: {
            actionButtonLabel: 'Delete',
            dialogData: `Do you want to delete the profile with name  :  ${event.rowData.profileName}`,
            enableCancelButton: true,
          },
          styleClass: 'dialog-style',
          width: '35%',
          height: '35%'

        });
        this.dialogref.onClose.subscribe(res => {
          if (res === 'delete') {
            console.log(res)
            this.deleteProfile(event.rowData.profileId);
          }
        }, (error => {
          console.log(error);
        }));
        break;
    }
  }
  createProfile() {
    this.router.navigate(['admin', 'profile', 'create']);
  }
  deleteProfile(profileId) {
    const apiUrl = baseUrl + API_ENDPOINTS.profile.getProfilebyId + profileId
    this.appService.delete(apiUrl).subscribe(res => {
      this.toastrService.success('Profile deleted', 'Success');

      this.getProfiles();
    },err=>{
      this.toastrService.error(err.error)
    })
  }
}
