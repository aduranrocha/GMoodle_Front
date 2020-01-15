import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AuthService } from '../MyComponents/Users/functions/auth/auth.service';
import { Observable } from 'rxjs';
import { Activity } from '../models/activity';

@Injectable({
  providedIn: 'root'
})
export class ActivityService 
{
  urlEndPoint: string = 'http://localhost:8080/activity';
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


  public getAll():Observable<Activity[]>
  {
    return this.http.get<Activity[]>(this.urlEndPoint,{headers: this.addAuthorizationHeader()});
  }

  public getById(id: number):Observable<Activity>
  {
    return this.http.get<Activity>(`${this.urlEndPoint}/${id}`,{headers: this.addAuthorizationHeader()});
  }

  public join(body):Observable<any>
  {
    return this.http.post(this.urlEndPoint,body,{headers: this.addAuthorizationHeader()});
  }

  public create(activity: Activity):Observable<any>
  {
    return this.http.post(this.urlEndPoint,activity,{headers: this.addAuthorizationHeader()});
  }

  public update(activity: Activity,id: number):Observable<any>
  {
    return this.http.put(`${this.urlEndPoint}/${id}`,activity,{headers: this.addAuthorizationHeader()});
  }

  public delete(id: number):Observable<any>
  {
    return this.http.delete(`${this.urlEndPoint}/${id}`,{headers: this.addAuthorizationHeader()});
  }

  public getPaginate(page: number, items: number):Observable<any>
  {
    return this.http.get(`${this.urlEndPoint}/page/${items}/${page}`,{headers: this.addAuthorizationHeader()});
  }

  
}
