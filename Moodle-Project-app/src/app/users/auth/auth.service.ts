import { Injectable } from '@angular/core';
import {Observable, TimeoutError} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { User } from '../user/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _user: User;
  private _token: string;


  constructor(private http: HttpClient) { }

  public get user() : User{
    if (this._user != null) {
      return this._user;
    } else if (this._user == null && sessionStorage.getItem('user') != null){
      this._user = JSON.parse(sessionStorage.getItem('user')) as User;
      return this._user;
    }
    return new User();
  }

  public get token() : string {
    if (this._token != null) {
      return this._token;
    } else if (this._token == null && sessionStorage.getItem('tokenn') != null){
      return this._token;
    }
    return null;
  }

  login(user: User): Observable<any>{
    const urlEndpoint = 'http://localhost:8080/oauth/token';

    const credentials = btoa('angularapp' + ':' + '12345');

    const httpHeaders = new HttpHeaders({
      'Access-Control-Allow-Oring':'*', 
      'Content-Type':'application/x-www-form-urlencoded', 
      'Authorization':'Basic '+ credentials
    });

    let params = new URLSearchParams();
    params.set('grant_type','password');
    params.set('username', user.username);
    params.set('password', user.password);

    console.log(params.toString());

    return this.http.post<any>(urlEndpoint, params.toString(), {headers: httpHeaders});
  }
  
   saveUser(accessToken: string):void{

     let payload = this.getTokenData(accessToken);
    this._user = new User();
    this._user.name = payload.name;
    this._user.lastName = payload.lastName;
    this._user.email = payload.email;
    this._user.username =  payload.user_name;
    this._user.roles = payload.authorities;
    console.log(' THIS ROLE->'+this._user.roles);
    sessionStorage.setItem('user',JSON.stringify(this._user));
   }

   saveToken(accessToken: string):void{
    this._token = accessToken;
    sessionStorage.setItem('token',accessToken);
   } 

   getTokenData(accessToken : string):any{
    if(accessToken!=null){
      return JSON.parse(atob(accessToken.split(".")[1]));
      
    }
    return null;
   }

   hasRole(role: string): boolean {
    if (this.user.roles.includes(role)) {
      return true;
    }
    return false;
  }

   logout():void{
     this._token = null;
     this._user = null;
     sessionStorage.clear();
     sessionStorage.removeItem('token');
     sessionStorage.removeItem('user');
   }
   
   isLoggedIn(): boolean {
     let session = sessionStorage.getItem('token');
     if (session != null ){
       return true
     }

     /*
     let payload = this.getTokenData(this.token);
     if(payload != null && payload.user_name && payload.user_name.lenght>0){
       return true;
     }
     */ 

     return false;
   }

}
