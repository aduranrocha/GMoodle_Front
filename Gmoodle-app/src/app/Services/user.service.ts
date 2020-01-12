import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../MyComponents/Users/functions/auth/auth.service';
import { User } from '../MyComponents/Users/functions/user/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  urlEndPont: string = 'http://localhost:8080/admin';
  httpHeaders = new HttpHeaders({'Content-type': 'application/json'});
  constructor(private http: HttpClient,
              private _authService: AuthService) { }


  //*Auth authorization header for private routes
  private addAuthorizationHeader()
  {
    //*Validate if exits token
    let token = this._authService.token;
    if(token != null)
    {
      return this.httpHeaders.append('Authorization', 'Bearer '+ token);
    }
    return this.httpHeaders;
  }

  public create(user: User):Observable<any>
  {
    return this.http.post(`${this.urlEndPont}/create`,user,{headers: this.addAuthorizationHeader()});
  }
}
