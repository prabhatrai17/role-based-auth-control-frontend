import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthGuardService } from '../shared/services/AuthGuard/auth-guard.service';
import { roles } from '../app-constants';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(private authService: AuthGuardService,private router:Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    if (state.url.includes('admin') && this.authService.getLoginCredentials() != null &&
      this.authService.getLoginCredentials().authorities.includes(roles.AdminRole)) {

      return true;
    } console.log(state)
    if (state.url.includes('user') && this.authService.getLoginCredentials() != null &&
      this.authService.getLoginCredentials().authorities.includes(roles.userRole)) {

      return true;
    }
    else {

      
      
      state.url = '/account/login'; // Set redirect URL
      this.authService.logout()
      this.router.navigateByUrl(state.url);
      
      return false; // Deny access and redirect
    }
  }

}
