export class User {
    username : string;
	name : string;
	lastName : string;
	email :  string;
	password : string;
//	enabled : true,
//	"gender" : false,
	address : string;
	phoneNumber : string;
//	birthDate : "01/01/1990 14:00";
//	"photo" : "image";
/*	"roles" : [
		{
			"name" : "ROLE_ADMIN"
		}	
    ]
*/
    roles: string[] = [];
}
