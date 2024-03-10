import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, Observable, filter } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private navigationEnd$: Observable<NavigationEnd>;

  constructor(private router: Router) {
    this.navigationEnd$ = this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd)
    ) as Observable<NavigationEnd>;
  }
  private isCurrentUserAdmin$ = new BehaviorSubject<boolean>(false);

  setCurrentUserAdminFlag(value: boolean) {
    this.isCurrentUserAdmin$.next(value);
  }
  getCurrentAdminStatus() {
    return this.isCurrentUserAdmin$;
  }
  getNavigationEnd(): Observable<NavigationEnd> {
    return this.navigationEnd$;
  }

}
