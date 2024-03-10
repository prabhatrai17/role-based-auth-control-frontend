import { Profile } from "./Profile";

export interface User
{
    userId?:number;
    username: string;
    email: string;
    password: string;

    profile:Profile;

    

}