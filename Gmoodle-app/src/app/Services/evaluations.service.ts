import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../MyComponents/Users/functions/auth/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class EvaluationsService 
{

  urlEndPoint: string = 'http://localhost:8080/activity';
  httpHeaders = new HttpHeaders({'Content-type': 'application/json'});
  
  constructor(private http: HttpClient, private _authService: AuthService) 
  { }




}
