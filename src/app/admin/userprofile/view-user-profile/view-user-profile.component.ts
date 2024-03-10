import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Profile } from 'src/app/Interface/Profile';
import { Role } from 'src/app/Interface/Role';
import { API_ENDPOINTS, baseUrl } from 'src/app/app-constants';
import { AppService } from 'src/app/shared/services/app-service/app.service';
import { UserProfileService } from 'src/app/shared/services/userprofileService/user-profile.service';

@Component({
  selector: 'app-view-user-profile',
  templateUrl: './view-user-profile.component.html',
  styleUrls: ['./view-user-profile.component.css']
})
export class ViewUserProfileComponent {
  profiles: Profile[];

  constructor(private userProfileService: UserProfileService, private appService:AppService,private router: Router)
  {
      this.getProfiles();
  }


  getProfiles()
  {
    this.appService.get( baseUrl + API_ENDPOINTS.profile.getAllProfiles).subscribe(
      (response:Profile[]) => {
        console.log(response);
        this.profiles=response;
      },
      (error) => {console.log(error)}
    );
    
  }

  onProfileClick(value: string)
  {
    console.log(value);
    this.router.navigate(['admin','profileWithUser',value]);
  }
}
