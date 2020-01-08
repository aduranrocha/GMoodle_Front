export class User {
 
	id: number;
    username : string;
	name : string;
	lastName : string;
	email :  string;
	password : string;
	address : string;
	phoneNumber : string;
	roles: string[] = [];
	//added for the user.component.ts archive but still not sure where it comes from in the tutorial
  content: User[];
}
