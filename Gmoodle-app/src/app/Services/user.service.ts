import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from '../MyComponents/Users/functions/auth/auth.service';
import { User } from '../MyComponents/Users/functions/user/user';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  urlEndPoint: string = 'http://localhost:8080/admin';
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

  /**
   **This function send user data to api for create
   * @param user: user body
   */
  public create(user: User):Observable<any>
  {
    return this.http.post(`${this.urlEndPoint}/create`,user,{headers: this.addAuthorizationHeader()}).pipe(
      map((response: any) => response.user as User), 
      catchError(e => 
      {
        if (this._authService.isNotAthorized(e)) 
        {
          return throwError(e);
        }
        if (e.status == 400) 
        {
          return throwError(e);
        }
        console.error(e.error.message); //check error on the console just in case and also show it to the user!
        Swal.fire(e.error.message, e.error.error, 'error');
        return throwError(e);
      })
    );
  }
  /**
   **This function send user data to api for update
   * @param user: user body
   * @param id: id user
   */
  public update(user: User):Observable<any>
  {
    return this.http.put<any>(`${this.urlEndPoint}/${user.id}`, user, { headers: this.addAuthorizationHeader()}).pipe(
      catchError(e => 
      {
        if (this._authService.isNotAthorized(e)) 
        {
          return throwError(e);
        }

        if (e.status == 400) 
        {
          return throwError(e);
        }

        console.log(e.error.message);
        Swal.fire('Error updating' + e.error.message, e.error.error, 'error');
        return throwError(e);
    })
    );
  }
}
