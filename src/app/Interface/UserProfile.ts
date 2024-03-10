import { Profile } from "./Profile";
import { User } from "./User";

export interface UserProfile
{
    userProfileId?: number;
    profile: Profile;
    users: User[];
}

