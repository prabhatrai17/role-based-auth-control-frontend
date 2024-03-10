import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Profile } from 'src/app/Interface/Profile';
import { Role } from 'src/app/Interface/Role';
import { User } from 'src/app/Interface/User';
import { UserProfile } from 'src/app/Interface/UserProfile';
import { UserProfileService } from 'src/app/shared/services/userprofileService/user-profile.service';

@Component({
  selector: 'app-profile-user-list',
  templateUrl: './profile-user-list.component.html',
  styleUrls: ['./profile-user-list.component.css']
})
export class ProfileUserListComponent {
  profileName: string;
    userProfiles: UserProfile;

    constructor(private userProfileService: UserProfileService, private activeRoute:ActivatedRoute)
    {
      
    }

    ngOnInit()
    {
      this.activeRoute.paramMap.subscribe(
        (data) =>
        {
          console.log(data.get('profile'));
          this.profileName=data.get('profile');
        }
      )

      this.getUserListProfileWise(this.profileName);

    }


    getUserListProfileWise(parameter: string)
    {
     
      this.userProfileService.getUserListProfileWise(parameter).subscribe(
        (response:UserProfile) => {
          console.log("userList:"+response);
          this.userProfiles=response;
        },
        (error) => {console.log(error)}
      )
    }

    sendProfileName()
    {
      this.userProfileService.shareProfileName(this.profileName);
    }

    deleteUserAssociatedWithProfile(userId: number)
    {
      this.userProfileService.deleteUserAssociatedWithProfile(this.profileName, userId).subscribe(
        (data: UserProfile) =>
        {
          this.getUserListProfileWise(this.profileName);
          this.userProfiles=data;
        },
        (error) => {console.log(error)}
      )
      console.log("delted id is :"+userId);
    }

    getJoinedRoleNames(profile:Profile) {
      
      const roleNames = profile.roles.map(role => role.roleName).join(', ');
      return roleNames ; // Handle potential undefined values
    }
}
