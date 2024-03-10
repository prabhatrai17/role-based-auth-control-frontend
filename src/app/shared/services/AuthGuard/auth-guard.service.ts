import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Login } from 'src/app/Interface/Login';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor() {
    
   }


  private header: HttpHeaders;

  private authHeaderSubject=new BehaviorSubject<HttpHeaders>(null);

  // AuthGuardService
    setLoginCredentials(loginCredentials:Login){
    localStorage.setItem('authData', btoa(loginCredentials.username+":"+loginCredentials.password+":"+loginCredentials.authorities));
  }
  private setHeader(){
    if(this.getLoginCredentials()!=null){
      this.authHeaderSubject.next(new HttpHeaders({Authorization:"Basic "+btoa(this.getLoginCredentials().username+":"+this.getLoginCredentials().password)})); 
    }
    else{
      this.header=null;
    }
    
  }

getLoginCredentials() {
  const storedData = localStorage.getItem('authData');
  if(storedData!=null){
      const splitData:string[]=atob(storedData).split(":");
      
      const loginData:Login={
        username: splitData.at(0),
        password: splitData.at(1),
        authorities:splitData.at(2).split(",")
      }
      
      return loginData;
  }
  return null;
}
getHeader(){
  this.setHeader();
  this.header=this.authHeaderSubject.value;
  return this.header;
}

logout() {
  // Clear LocalStorage on logout
  localStorage.removeItem('authData');
  this.header=null;
}

  
  // setLoginCredentials(loginCredentials:Login){
  //   this.authCredentialsSubject.next(loginCredentials);
  //   this.setHeader();
  //   console.log(this.getLoginCredentials());
  //   console.log(this.getHeader())
  // }


  // getLoginCredentials():Login{
  //   // this.authCredentialsSubject.subscribe((res)=>this.loginCredentials=res);
  //   this.loginCredentials=this.authCredentialsSubject.value;
  //   return this.loginCredentials;
  // }

  // private setHeader(){
    
  //   if(this.loginCredentials!=null){
  //     this.authHeaderSubject.next(new HttpHeaders({Authorization:"Basic "+btoa(this.loginCredentials.username+":"+this.loginCredentials.password)}));
  //   }
  //   else{
  //     this.authHeaderSubject.next(null);
  //   }
    
  // }

  // getHeader():HttpHeaders{
  //   // this.authHeaderSubject.subscribe((res)=>this.header=res);
  //   this.header=this.authHeaderSubject.value;
  //   return this.header;
  // }

}
