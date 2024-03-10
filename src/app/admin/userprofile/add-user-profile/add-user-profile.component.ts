import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { Profile } from 'src/app/Interface/Profile';
import { Role } from 'src/app/Interface/Role';
import { User } from 'src/app/Interface/User';
import { UserProfile } from 'src/app/Interface/UserProfile';
import { UserProfileDto } from 'src/app/Interface/UserProfileDto';
import { API_ENDPOINTS, baseUrl } from 'src/app/app-constants';
import { AppService } from 'src/app/shared/services/app-service/app.service';
import { UserProfileService } from 'src/app/shared/services/userprofileService/user-profile.service';
 
@Component({
  selector: 'app-add-user-profile',
  templateUrl: './add-user-profile.component.html',
  styleUrls: ['./add-user-profile.component.css']
})
export class AddUserProfileComponent {
  profileName: string;
 
  reactiveForm: FormGroup;
  formStatus: string = '';
 
  usersFromDb: User[];
  filteredOptions: User[] = [];
 
  profiles: Profile[];
  filteredProfile:Profile[];
  userProfiles: UserProfile=null;
 
  userProfileDto: UserProfileDto={
    userIds: [],
    profileId: 0
  }
 
 
  constructor(private toastrService:ToastrService,private userProfileService: UserProfileService,private appService:AppService, private router: Router)
  {
    this.getUsers();
    this.getProfiles();
  }
   
 
  ngOnInit()
  {
    this.getUsers();
    this.getProfiles();
    this.userProfileService.data$.subscribe(
      (data) =>
      {
        console.log("behaviour subject:"+data);
        this.profileName=data;
      }
    )
 
    this.getUserListProfileWise(this.profileName);
 
 
    this.reactiveForm = new FormGroup({
      profile: new FormControl(this.profileName),
      users: new FormArray([
        new FormGroup({
          userid: new FormControl(null),
          username: new FormControl(null),
          email: new FormControl(null),
         
        })
      ])
    })
 
 
  }
 
 
  OnFormSubmitted()
  {
    console.log(this.reactiveForm);
 
    const inputUserList:User[]=this.reactiveForm.get('users').value;
    let inputUserIdList:number[]=[];
 
    for(let i=0;i<inputUserList.length;i++)
    {
      const userId=this.reactiveForm.get("users."+i+".userid").value;
      console.log(userId);
      if(userId==null){
        this.toastrService.error('please enter user from the drop down');
        this.router.navigateByUrl("/admin/updateUserProfile");
        return;
    }
     
      inputUserIdList.push(userId);
    }
   
    if(new Set(inputUserIdList).size!=inputUserIdList.length){
      this.toastrService.error('please don not add duplicate user from the drop down');
      this.router.navigateByUrl("/admin/updateUserProfile");
      return;
    }
    const newlyAddedProfile:Profile=this.profiles.find(prf=> prf.profileName.toLowerCase() === this.profileName.toLowerCase());
    this.userProfileDto.userIds= inputUserIdList;
    this.userProfileDto.profileId=newlyAddedProfile.profileId;
   
      console.log(this.userProfileDto);
      console.log("-----------");
 
    if(this.userProfiles===null)
    {
      console.log("hello guys");
      this.saveUserProfile();
    }
    else{
      console.log("UserProfilelist is not empty");
      this.updateUserProfile();
    }
   
  }
 
  deleteUser(index: number)
  {
    const frmArray=(<FormArray>this.reactiveForm.get("users"));
    frmArray.removeAt(index);
  }
 
  addUser()
  {
    const frmGrpUser= new FormGroup
    (
      {
        userid: new FormControl(null),
        username: new FormControl(null),
        email: new FormControl(null),
       
      }
    );
 
    (<FormArray>this.reactiveForm.get('users')).push(frmGrpUser);
  }
 
 
  getUsers()
  {
    this.appService.get(baseUrl+API_ENDPOINTS.user.getAllUsers).subscribe(
      (response) => {
       
        this.usersFromDb=response.data;
      },
      (error)=>{console.log(error)}
    );
  }
 
  onInputChange(index: number)
  {
    this.reactiveForm.get("users."+index+".username").valueChanges.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      ).subscribe(value =>
        {
          console.log(value);
        this.filteredOptions = this.filterOptions(value);
        console.log(this.filteredOptions);
        });
  }
 
 
  filterOptions(value: string): User[] {
    const filterValue = value.toLowerCase();
    return this.usersFromDb.filter(user => user.username.toLowerCase().includes(filterValue));
  }
 
  selectOption(option: User, index: number)
  {
    this.reactiveForm.get("users."+index+".userid").setValue(option.userId);
    this.reactiveForm.get("users."+index+".username").setValue(option.username);
    this.reactiveForm.get("users."+index+".email").setValue(option.email);
    this.filteredOptions = [];
  }
 
  getProfiles()
  {
    this.appService.get(baseUrl+API_ENDPOINTS.profile.getAllProfiles).subscribe(
      (response:Profile[]) => {
        console.log(response);
        this.profiles=response;
      },
      (error) => {console.log(error)}
    );
   
  }
 
  saveUserProfile()
  {
    console.log("i ma in save userprofile:"+this.userProfileDto.profileId);
    this.userProfileService.createUserProfile(this.userProfileDto).subscribe(
      data => {
                console.log("hey I am in saveUserProfile:"+data);
                this.goToUserProfileList(this.profileName);
              },
      error => {
        console.log((error.error.errorMsg))
        this.toastrService.error(error.error.errorMsg)}
    );
  }
 
  updateUserProfile()
  {
    this.userProfileService.updateUserProfile(this.userProfileDto).subscribe(
      data => {
        this.goToUserProfileList(this.profileName);
      },
      (error) => {console.log(error);this.toastrService.error(error.error.errorMsg)}
    )
  }
 
  goToUserProfileList(value: string)
  {
    console.log("hey I am in go to user profile list");
    // this.router.navigate(['/usersWithProfile'])
    this.router.navigate(['/admin/profileWithUser/'+value]);
  }
 
  getUserListProfileWise(parameter: string)
  {
    this.userProfileService.getUserListProfileWise(parameter).subscribe(
      (response:UserProfile) => {
        console.log(response);
        this.userProfiles=response;
      },
      (error) => {console.log(error)}
    )
  }
}
 