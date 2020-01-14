import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AuthService } from '../MyComponents/Users/functions/auth/auth.service';
import { GroupClass } from '../models/groupclass';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  urlEndPoint: string = 'http://localhost:8080/group';
  httpHeaders = new HttpHeaders({'Content-type': 'application/json'});
  constructor(private http: HttpClient,
    private _authService: AuthService) 
  { 

  }

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

  public getAll():Observable<GroupClass[]>
  {
    return this.http.get<GroupClass[]>(this.urlEndPoint,{headers: this.addAuthorizationHeader()});
  }

  public join(body):Observable<any>
  {
    return this.http.post(this.urlEndPoint,body,{headers: this.addAuthorizationHeader()});
  }
}
