import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { LoaderService } from '../../services/loader-service/loader.service';
import { adminSideMenuData, roles, userSideMenuData } from 'src/app/app-constants';
import { Subscription, filter } from 'rxjs';
import { CommonService } from '../../services/common-service/common.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent implements OnInit {
  sideBarParameters: any[] = [];
  isUserAdmin = false
  subscriptions: Array<Subscription> = [];
  constructor(private router: Router,
    private commonService: CommonService,
    private cookieService: CookieService
  ) {
    this.subscriptions.push(
      this.commonService.getCurrentAdminStatus().subscribe((res: boolean) => {
        if (res === true) {
          this.sideBarParameters = adminSideMenuData;
          this.isUserAdmin = true
        } else {
          this.isUserAdmin = false

          this.sideBarParameters = userSideMenuData
        }
      }));

    this.subscriptions.push(this.commonService.getNavigationEnd().subscribe(event => {
      if (event.url.split('/').length > 2) {
        const sideMenuIdentifier = event.url.split('/')[2];
        const sidemenuActiveMenuIndex = this.sideBarParameters.findIndex(ele => ele.name === sideMenuIdentifier);
        if (sidemenuActiveMenuIndex !== -1) {

          this.changeStyleMenuElement(sidemenuActiveMenuIndex);
        }
      } else {
        this.changeStyleMenuElement(0);
      }
    }));
  }
  elementClick(name: String, index: number) {
    this.changeStyleMenuElement(index);
    switch (name) {
      case 'home':
        this.router.navigate(['admin'])
        return;
      case 'employee':
        this.router.navigate(['admin', 'employee', 'list'])
        return;
      case 'application':
        if (this.isUserAdmin) {
          this.router.navigateByUrl("/admin/viewApplications")
        } else {
          this.router.navigate(['user', 'application', 'list'])
        }
        return;
      case 'profile':
        this.router.navigate(['admin', 'profile', 'list'])
        return;
      case 'role':
        this.router.navigate(['admin', 'role', 'list'])
        return;
      case 'userProfiles':
        this.router.navigateByUrl('/admin/viewUserProfiles')
        return;
    }
  }
  changeStyleMenuElement(index: number) {
    if (this.sideBarParameters.length > 0) {
      this.sideBarParameters.forEach(ele => {
        ele.active = false;
      });
      this.sideBarParameters[index].active = true;
    }

  }
  ngOnInit() {

  }
  ngOnDestroy() {
    this.subscriptions.forEach(ele => {
      if (ele) {
        ele.unsubscribe();
      }
    });
  }


}
