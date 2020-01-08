import { Injectable } from '@angular/core';
import { User } from '../users/user/user'; //user method where is set the strings for username, name, lastname and such
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import { map, catchError, tap, throwIfEmpty } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import Swal from 'sweetalert2';

import { Router } from '@angular/router';
import { AuthService } from '../users/auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class StudentService {
  //Host of my backend and the Headers need to make patitions
  private urlEndPoint: string = 'http://localhost:8080/api/clientes';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }

  //Metho for get the Authorization using getters 
  private addAuthorizationHeader() {
    let token = this.authService.token;
    if (token != null) {
      return this.httpHeaders.append('Authorization', 'Bearer' + token);
    }
    return this.httpHeaders;
  }
  //Method that will respond in case the user tries to get to a protected section 
  private isNotAthorized(e): boolean {
    if (e.status == 401) {
      if (this.authService.isLoggedIn()) {
        this.authService.logout();
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
  //FUN PART! CRUD
  //This part will set the getters and setter for the Students Crud
  //I'm usin user for creating new students, but I dont know if I need to use student and create a new student.ts archive.

  //In this create method is added some catch errors in case something goes wrong and display it on a sweet alert message

  //CREATE!
  create(user: User): Observable<User> {
    return this.http.post(this.urlEndPoint, user, { headers: this.addAuthorizationHeader() }).pipe(map((response: any) => response.user as User), catchError(e => {
      if (this.isNotAthorized(e)) {
        return throwError(e);
      }
      if (e.status == 400) {
        return throwError(e);
      }
      console.error(e.error.message); //check error on the console just in case and also show it to the user!
      Swal.fire(e.error.message, e.error.error, 'error');
      return throwError(e);
    })
    );
  }
//get User by username! And adding catch-error for some posible unathorized consultings
getUser(username): Observable<User>{
  return this.http.get<User>(`${this.urlEndPoint}/${username}`,{ headers : this.addAuthorizationHeader()}).pipe(catchError(e => {

    if (this.isNotAthorized(e)){
      return throwError(e);
    }

    this.router.navigate(['/login']); //CHECK PATH!!!!!!! should i send it all to a table page ? just one and share it with teacher and admin-??? i guess so
    console.log(e.error.message);
    Swal.fire('Error', e.error.message, 'error');
    return throwError(e);
  })
  );
}
  //I have faith it will work out just fine if i just stick to the tutorials......
  //Update methos using only the id in this case, i'm sure all the other information of the user will be updated.... 
  update(user : User): Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/${user.id}`, user, {
      headers : this.addAuthorizationHeader()}).pipe(catchError(e=> {

        if(this.isNotAthorized(e)){
          return throwError(e);
        }

        if(e.status == 400){
          return throwError(e);
        }

        console.log(e.error.message);
        Swal.fire(e.error.message, e.error.error, 'error');
        return throwError(e);
    })
    );
  }
  

  //Delete method also using the id (BORRAR PARTE DE FRONT!)
  delete(id: number): Observable<User>{
    return this.http.delete<User>(`${this.urlEndPoint}/${id}`, { headers: this.addAuthorizationHeader()}).pipe(catchError(e => {
      if (this.isNotAthorized(e)) {
        return throwError(e);
      }

      console.error(e.error.message)
    }))
  }
}
