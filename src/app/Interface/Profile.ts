import { Role } from "./Role";

export interface Profile
{
    profileId?: number;
    profileName: string;
    profileDescription: string;
    roles: Role[] 
}