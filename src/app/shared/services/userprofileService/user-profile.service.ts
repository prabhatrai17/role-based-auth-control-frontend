import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Profile } from 'src/app/Interface/Profile';
import { Role } from 'src/app/Interface/Role';
import { User } from 'src/app/Interface/User';
import { UserProfile } from 'src/app/Interface/UserProfile';
import { AuthGuardService } from '../AuthGuard/auth-guard.service';
import { UserProfileDto } from 'src/app/Interface/UserProfileDto';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  private baseURL = "http://localhost:8000/userProfileApi";

  private baseURL3= "http://localhost:8000/userProfileApi/byProfileName/";

  private baseURL4= "http://localhost:8000/userProfileApi/byProfilewiseAdd";

  private baseURL5= "http://localhost:8000/userProfileApi/userAssociatedWithProfile/"

 

  constructor(private httpClient: HttpClient,private authService:AuthGuardService) { }

  getUserProfileList(): Observable<UserProfile[]>{
    return this.httpClient.get<UserProfile[]>(`${this.baseURL}`,{headers:this.authService.getHeader()});
  }

  

  getUserListProfileWise(parameter: string): Observable<UserProfile>
  {
    const url = `${this.baseURL3}${parameter}`;
    console.log(url);
    return this.httpClient.get<UserProfile>(url,{headers:this.authService.getHeader()});
  }

  createUserProfile(userProfileDto: UserProfileDto): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}`,userProfileDto,{headers:this.authService.getHeader()});
  }

  updateUserProfile(userProfileDto: UserProfileDto): Observable<Object>{
    return this.httpClient.put(`${this.baseURL4}`, userProfileDto,{headers:this.authService.getHeader()});
  }

  deleteUserAssociatedWithProfile(profileName: string, userId: number):Observable<Object>{
    const url=`${this.baseURL5}${profileName}/${userId}`;
    console.log("URL:"+url);
    return this.httpClient.delete(`${url}`,{headers:this.authService.getHeader()});
  }

  // getRoleList(): Observable<Role[]>{
  //   return this.httpClient.get<Role[]>(`${this.baseURL1}`);
  // }

  // getUserListByProfileWise(): Observable<UserProfile[]>{
  //   return this.httpClient.get<UserProfile[]>(`${this.baseURL2}`);
  // }

  profileNameSubject=new BehaviorSubject<string>('');

  data$= this.profileNameSubject.asObservable();

  shareProfileName(profileName: string)
  {
    this.profileNameSubject.next(profileName);

  }

}
