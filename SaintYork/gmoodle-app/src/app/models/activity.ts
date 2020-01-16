import { Course } from './course';
import { User } from '../MyComponents/Users/functions/user/user';

export class Activity 
{
    idActivity: number;
    titleActivity: string;
    course: Course[];
    users: User;
    createAt: string;
}