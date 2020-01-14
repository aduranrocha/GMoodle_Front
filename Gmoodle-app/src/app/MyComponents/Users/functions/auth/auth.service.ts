//Libraries needed to work with http headers and components to make the petitions 
import { Injectable } from '@angular/core';
import {Observable, TimeoutError} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { User } from '../user/user';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})

//Class AuthService called on other components
export class AuthService {

  //Private variables 
  private _user: User;
  private _token: string;


  constructor(private http: HttpClient, private router: Router) { }

  //Getter of method user 
  public get user() : User{
    if (this._user != null) {
      return this._user;
    } else if (this._user == null && sessionStorage.getItem('user') != null){
      this._user = JSON.parse(sessionStorage.getItem('user')) as User; 
      return this._user;
    }
    return new User();
  }

  //Getter of method token
  public get token() : string {
    if (this._token != null) {
      return this._token;
    } else if (this._token == null && sessionStorage.getItem('token') != null){
      this._token = sessionStorage.getItem('token');
      return this._token;
    }
    return null;
  }

  //login method for actually sent to the back the petition for loging in 
  login(user: User): Observable<any>{
    const urlEndpoint = 'http://localhost:8080/oauth/token'; //path

    const credentials = btoa('angularapp' + ':' + '12345'); // Athorization username and password

      //Headers needed to get a token 
    const httpHeaders = new HttpHeaders({
      // 'Access-Control-Allow-Oring':'*', 
      'Content-Type':'application/x-www-form-urlencoded', 
      'Authorization':'Basic '+ credentials
    });

    //For each user their credentials so can be checked by the backend and then be given athorization or not.
    let params = new URLSearchParams();
    params.set('grant_type','password');
    params.set('username', user.username);
    params.set('password', user.password);

    console.log(params.toString()); //Convert the paramethers into a string

    return this.http.post<any>(urlEndpoint, params.toString(), {headers: httpHeaders}); //Host, paramethers and headers
  }
    //Method where all the 'informaition' of the user is saved from the token (from a Json to String) so it can be used by the front
   saveUser(accessToken: string):void{
      //User data
     let payload = this.getTokenData(accessToken);
    this._user = new User();
    this._user.name = payload.name;
    this._user.lastName = payload.lastName;
    this._user.email = payload.email;
    this._user.username =  payload.user_name;
    this._user.roles = payload.authorities;
    this._user.isDemoUser = payload.isDemoUser;
   

    console.log(' THIS ROLE->'+this._user.roles); //Console confirmation everything is working good!

    sessionStorage.setItem('user',JSON.stringify(this._user)); //save on session storage the information from the user. 
   }

   //Method where the token is saved  with all the information needed!
   saveToken(accessToken: string):void{
    this._token = accessToken;
    sessionStorage.setItem('token',accessToken);
   } 

   //Once we get the token from the back this Getter will split the information insde it so the information can be used by the front. 
   getTokenData(accessToken : string):any{
    if(accessToken!=null){
      return JSON.parse(atob(accessToken.split(".")[1]));
      
    }
    return null;
   }
   //Authentication of the session [NOT USED]
   isAuthenticated(): boolean{
     let payload = this.getTokenData(this.token);
      console.log('payload'+ payload.user_name)
     if (payload =! null && payload.user_name.length > 0)
     {
       console.log('IS TRUE')
       return true;
     }
     return false;
   }


   //Conditional that checks if the user has certain role 
   hasRole(role: string): boolean {
    if (this.user.roles.includes(role)) {
      return true;
    }
    return false;
  }

  //Method to logout 
   logout():void{
     this._token = null;
     this._user = null;
     sessionStorage.clear(); //It clear /  deletes all users and all tokens
     sessionStorage.removeItem('token'); // deletes just the token
     sessionStorage.removeItem('user'); // deletes just the user
   }


  //Method that will respond in case the user tries to get to a protected section 
  public isNotAthorized(e): boolean {
    if (e.status == 401) {
      if (this.isAuthenticated()) {
        this.logout();
      }
      this.router.navigate(['/login']);
      return true;
    }

    if (e.status == 403) {
      Swal.fire('Access Denided');
      this.router.navigate(['/login']);
      return true;
    }
    return false;
  }

}
