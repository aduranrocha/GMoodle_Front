import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AuthService } from '../MyComponents/Users/functions/auth/auth.service';
import { Course } from '../models/course';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoruseService {
  urlEndPoint: string = 'http://localhost:8080/api/course';
  httpHeaders = new HttpHeaders({'Content-type': 'application/json'});
  
  constructor(private http: HttpClient, private _authService: AuthService) { }

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


  public create(course: Course):Observable<Course>
  {
    return this.http.post<Course>(this.urlEndPoint,course,{headers: this.addAuthorizationHeader()});
  }

  public update(course: Course, id: number):Observable<Course>
  {
    return this.http.put<Course>(`${this.urlEndPoint}/${id}`,course,{headers: this.addAuthorizationHeader()});
  }

  public delete(id: number):Observable<any>
  {
    return this.http.delete(`${this.urlEndPoint}/${id}`,{headers: this.addAuthorizationHeader()});
  }

  public getCourses(page: number):Observable<any>
  {
    return this.http.get(`${this.urlEndPoint}/page/${page}`,{headers: this.addAuthorizationHeader()});
  }
}
