import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { API_ENDPOINTS, baseUrl, roleDataColumns } from 'src/app/app-constants';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { AppService } from 'src/app/shared/services/app-service/app.service';
import { LoaderService } from 'src/app/shared/services/loader-service/loader.service';

@Component({
  selector: 'app-role-table',
  templateUrl: './role-table.component.html',
  styleUrls: ['./role-table.component.css']
})
export class RoleTableComponent implements OnInit {
  roleColumns = roleDataColumns;
  rolesData: any[] = [];
  loadData = false;
 
  constructor(private appService: AppService,
    private loaderSrvice: LoaderService,
    private router: Router,private toastrService:ToastrService,private dialogService:DialogService,
    public config: DynamicDialogConfig,
    private dialogref: DynamicDialogRef) { }
  ngOnInit() {
    
    this.loaderSrvice.setLoader(true);
    this.loadData = true;
    this.getRoles();
    
  }
  getRoles(){
    const apiUrl = baseUrl + API_ENDPOINTS.roles.getRoles;
    this.appService.get(apiUrl).subscribe(res => {
      this.loaderSrvice.setLoader(false);
      this.loadData = false;
      this.rolesData = res.results;
    })
  }
  buttonClickMethod(event: any) {
    console.log(event)
    switch (event.action) {
      case 'edit':
        this.router.navigate(['admin', 'role', 'edit', event.rowData.roleId])
        break;
      case 'delete':
        this.dialogref =   this.dialogService.open(ConfirmDialogComponent, {
          header: 'Delete',
          data: {
            actionButtonLabel: 'Delete',
            dialogData: `Do you want to delete the role with name  :  ${event.rowData.roleName}`,
            enableCancelButton: true,
          },
          styleClass: 'dialog-style',
          width: '35%',
          height: '35%'

        });
        this.dialogref.onClose.subscribe(res => {
          if (res === 'delete') {
            console.log(res)
            this.deleteRole(event.rowData.roleId);
          }
        }, (error => {
          console.log(error);
        }));
        break;
    }
        
    }
  
  createRole() {
    this.router.navigate(['admin','role','create']);
  }

  deleteRole(roleId) {
    const apiUrl = baseUrl + API_ENDPOINTS.roles.getRoles+roleId
    this.appService.delete(apiUrl).subscribe(res => {
      this.toastrService.success('role deleted', 'Success');
      this.getRoles();
      
    },err=>{
      this.toastrService.error(err.error)
    })
  }
}
