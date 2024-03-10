import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { LoaderService } from './shared/services/loader-service/loader.service';
import { Subscription, filter } from 'rxjs';

import { API_ENDPOINTS, baseUrl, roles } from './app-constants';
import { CommonService } from './shared/services/common-service/common.service';
import { AppService } from './shared/services/app-service/app.service';
import { ToastrService } from 'ngx-toastr';
import { AuthGuardService } from './shared/services/AuthGuard/auth-guard.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'rbac-application-angular';
  showCommonComponents = true;
  sideBartoggle = false;
  year = new Date().getFullYear();
  showLoader = false;
  constructor(
    private router: Router,
    private appService: AppService,

    private commonService: CommonService,
    private toastrService: ToastrService,
    private authService: AuthGuardService) {

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        if (event.url.includes('login') || event.url.includes('register') || event.url.includes('/account/reset-password')) {
          this.showCommonComponents = false;
        } else {
          this.showCommonComponents = true;

        }
        console.log(event.url+" "+this.showCommonComponents);
      });
    if (this.authService.getLoginCredentials() === null) {
      this.router.navigate(['account', 'login']);

    } else {
      this.sideMenuInitialization();
    }

    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart && (event.navigationTrigger === 'popstate' && event.url.includes('/login'))) {
        this.authService.getLoginCredentials() ? this.router.navigateByUrl("/admin") : this.router.navigateByUrl("/user/application/list")
      }
    });


  }
  ngOnInit() {


  }
  sideMenuInitialization() {
    let subscribeData: Subscription;
    let urData = ''

    if (this.authService.getLoginCredentials().authorities.includes(roles.AdminRole)) {
      this.commonService.setCurrentUserAdminFlag(true);
    }
    subscribeData = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        urData = event.url; console.log(event.url);

        this.router.navigate([urData])
      });
    subscribeData.unsubscribe();
  }

  hamburgerMenuMethod() {
    this.sideBartoggle = !this.sideBartoggle;
  }
  logout() {
    const logoutUrl = baseUrl + API_ENDPOINTS.account.logout;
    console.log(logoutUrl)

    this.authService.logout();
    this.toastrService.success('Success', 'Logout successful');
    this.router.navigate(['account', 'login'])
  }

}
