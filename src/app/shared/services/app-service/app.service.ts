import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthGuardService } from '../AuthGuard/auth-guard.service';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private httpClient: HttpClient,private authService:AuthGuardService) { }
  private addBearerToken(options:any): any {
    options.headers=this.authService.getHeader()
    return options;
  }

  public get(url: string, paramObj: any = null): Observable<any> {
    let options: any = {};
    if (paramObj) {
      options.params = paramObj;
    }
    options = this.addBearerToken(options);
    return this.httpClient.get(`${url}`, options);
  }

  public post(url: string, body: Object): Observable<any> {
    let options: any = {};
    if (body) {
      options.body = body;
    }
    options = this.addBearerToken(options);
    console.log(url)
    console.log(options)
    return this.httpClient.post<any>(`${url}`, body,{headers:this.authService.getHeader()});

  }
  public login(url: string, paramObj?: Object): Observable<any> {

    return this.httpClient.post<any>(`${url}`, paramObj);

  }

  public logout(url:string):Observable<any>{
    return this.httpClient.post<any>(url,{},{headers:this.authService.getHeader()});
  }

  public put(url: string, paramObj?: Object): Observable<any> {
   
    return this.httpClient.put<any>(`${url}`, paramObj,{headers:this.authService.getHeader()});

  }
  public delete(url: string, paramObj?: Object): Observable<any> {
    let options: any = {};
    options.params = paramObj;
    options = this.addBearerToken(options);
    return this.httpClient.delete<any>(`${url}`, options);
  }
  public patch(url: string, paramObj?: Object): Observable<any> {
   
    return this.httpClient.patch<any>(`${url}`, paramObj,{headers:this.authService.getHeader()});

  }

}

