import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { API_ENDPOINTS, baseUrl, roleDataColumnsEmployeeSide } from 'src/app/app-constants';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { AppService } from 'src/app/shared/services/app-service/app.service';
import { LoaderService } from 'src/app/shared/services/loader-service/loader.service';

@Component({
  selector: 'app-employee-view',
  templateUrl: './employee-view.component.html',
  styleUrls: ['./employee-view.component.css']
})
export class EmployeeViewComponent implements OnInit {
  userId: any;
  userData: any;
  subscriptions: Array<Subscription> = [];
  rolesData = [];
  rolesColumns = roleDataColumnsEmployeeSide;
  constructor(private appService: AppService,
    private route: ActivatedRoute,
    private router: Router,
    public ref: DynamicDialogRef,
    private dialogService: DialogService,
    private toastrService: ToastrService,
    private loaderService: LoaderService) {
    if (this.route.snapshot.params.hasOwnProperty('id')) {
      this.userId = `${this.route.snapshot.paramMap.get('id')}`;
    }
  }
  ngOnInit() {
    this.getEmployeeData();
  }
  getEmployeeData() {
    let queryString = '';
    queryString = queryString + '?userId=' + this.userId;
    const apiUrl = baseUrl + API_ENDPOINTS.user.getUser + queryString;
    this.loaderService.setLoader(true);

    this.subscriptions.push(
      this.appService.get(apiUrl).subscribe(res => {
        this.loaderService.setLoader(false);
        this.userData = res.data;
        if(res.data.profile.hasOwnProperty('roles')) {
          this.rolesData = res.data.profile.roles;
        }
      }))
  }
  buttonClick(action: String) {
    switch (action) {
      case 'edit':
        this.router.navigate(['admin', 'employee', action, this.userId]);
        break;
      case 'redirect':
        this.router.navigate(['admin', 'employee', 'list']);
        break;
      case 'delete':
        this.ref = this.dialogService.open(ConfirmDialogComponent, {
          header: 'Delete',
          data: {
            actionButtonLabel: 'Delete',
            dialogData: `Do you want to delete the user with name  :  ${this.userData.username}`,
            enableCancelButton: true,
          },
          styleClass: 'dialog-style',
          width: '35%',
          height: '35%'
        });
        this.ref.onClose.subscribe(res => {
          if (res === 'delete') {
            this.deleteUser(this.userData);
          }
        }, (error => {
          console.log(error);
        }));
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
        this.router.navigate(['admin', 'employee', 'list'])
      },err=>{
        this.toastrService.error(err.error)
      }));

  }
  ngOnDestroy() {
    this.subscriptions.forEach(ele => {
      if (ele) {
        ele.unsubscribe();
      }
    });
  }
}
