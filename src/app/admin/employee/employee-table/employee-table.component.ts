import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { API_ENDPOINTS, baseUrl, employeeDataColumns } from 'src/app/app-constants';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { AppService } from 'src/app/shared/services/app-service/app.service';
import { LoaderService } from 'src/app/shared/services/loader-service/loader.service';

@Component({
  selector: 'app-employee-table',
  templateUrl: './employee-table.component.html',
  styleUrls: ['./employee-table.component.css']
})
export class EmployeeTableComponent implements OnInit {
  userListColumns = employeeDataColumns;
  userData: any[] = [];
  currentUserID = 0;
  subscriptions: Array<Subscription> = [];
  constructor(private loaderService: LoaderService,
    private router: Router,
    public ref: DynamicDialogRef,
    private dialogService: DialogService,
    private appService: AppService,
    private toastrService: ToastrService,
    // private authService:Auth
  ) {

  }

  ngOnInit() {
    this.getAllUsers();
  }
  getUser() {
    
  }
  getAllUsers() {
    const apiurl = baseUrl + API_ENDPOINTS.user.getAllUsers;
    this.loaderService.setLoader(true);
    this.subscriptions.push(
      this.appService.get(apiurl).subscribe(res => {
        this.loaderService.setLoader(false);
        this.userData = res.data; console.log(typeof res.data[0].userId);

      }, (error => {
        this.loaderService.setLoader(false);
        console.log(error);
        this.toastrService.error(error.errorMsg)
      })));
  }

  buttonClickMethod(event: any) {
    // console.log(event)
    switch (event.action) {
      case 'edit':
        this.router.navigate(['admin', 'employee', event.action, event.rowData.userId]);
        break;
      case 'delete':
        this.ref = this.dialogService.open(ConfirmDialogComponent, {
          header: 'Delete',
          data: {
            actionButtonLabel: 'Delete',
            dialogData: `Do you want to delete the user with name  :  ${event.rowData.username}`,
            enableCancelButton: true,
          },
          styleClass: 'dialog-style',
          width: '35%',
          height: '35%'
        });
        this.ref.onClose.subscribe(res => {
          if (res === 'delete') {console.log(res)
            this.deleteUser(event.rowData);
          }
        }, (error => {
          console.log(error);
        }));
        break;
      case 'view':
        this.router.navigate(['admin', 'employee', event.action, event.rowData.userId])
        break;

    }

  }
  deleteUser(rowData: any) {
    let queryString = '';
    queryString = queryString + '?userId=' + rowData.userId;
    const apiUrl = baseUrl + API_ENDPOINTS.user.getUser + queryString;
    this.subscriptions.push(
      this.appService.delete(apiUrl).subscribe(res => {
        this.toastrService.success('Success', 'User deleted sucessfully!')
        this.getAllUsers();
      },error=>{this.toastrService.error(error.errorMsg)}));

  }
  ngOnDestroy() {
    this.subscriptions.forEach(ele => {
      if (ele) {
        ele.unsubscribe();
      }
    });
  }
}
