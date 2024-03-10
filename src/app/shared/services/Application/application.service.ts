import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApplicationDetails } from 'src/app/Interface/ApplicationDetails';
import { AuthGuardService } from '../AuthGuard/auth-guard.service';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  applicationAPI="http://localhost:8000/applicationDetailsAPI";

  constructor(private http:HttpClient,private authService:AuthGuardService) {
    // authService.setLoginCredentials({username:"john@virtusa.com",password:"john",authorities:["ROLE_USER","ROLE_ADMIN","READ"]});
    // authService.setHeader();
    
    }

  createApplication(application:ApplicationDetails):Observable<boolean>{
    return this.http.post<boolean>(this.applicationAPI,application,{headers:this.authService.getHeader()});
  }

  getApplications():Observable<ApplicationDetails[]>{
    console.log(this.authService.getHeader());
    return this.http.get<ApplicationDetails[]>(this.applicationAPI,{headers:this.authService.getHeader()});
  }

  getApplicationById(applicationId:number):Observable<ApplicationDetails>{
    return this.http.get<ApplicationDetails>(this.applicationAPI+"/"+applicationId,{headers:this.authService.getHeader()});
  }
  

  editApplication(applicationId:number,applicationDetails:ApplicationDetails):Observable<boolean>{
    return this.http.put<boolean>(this.applicationAPI+"/"+applicationId,applicationDetails,{headers:this.authService.getHeader()});
  }

  deleteApplication(applicationId:number):Observable<boolean>{
    return this.http.delete<boolean>(this.applicationAPI+"/"+applicationId,{headers:this.authService.getHeader()});
  }

}
