import { User } from '../MyComponents/Users/functions/user/user';
import { Course } from './course';

export class Activity 
{
    idActivity: number;
    titleActivity: string;
    course: any;
    users: any;
    createAt: string;
    instructions: string;
    idUser: number;
    idCourse: number;
}