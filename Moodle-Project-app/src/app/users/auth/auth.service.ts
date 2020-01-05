import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { User } from '../user/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(user: User): Observable<any>{
    const urlEndpoint = 'http://localhost:8080/oauth/token';

    const credentials = btoa('angularapp' + ':' + '12345');

    const httpHeaders = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded', 'Authorization':'Basic '+ credentials});

    let params = new URLSearchParams();
    params.set('grant_type','password');
    params.set('username', user.username);
    params.set('password', user.password);

    console.log(params.toString());

    return this.http.post<any>(urlEndpoint, params.toString(), {headers: httpHeaders});
  }
   
}
