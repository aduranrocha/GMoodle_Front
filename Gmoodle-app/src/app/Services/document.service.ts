import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AuthService } from '../MyComponents/Users/functions/auth/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  urlEndPoint: string = 'http://localhost:8080/api/document';
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

  public getAllPaginate(page: number):Observable<any>
  {
    return this.http.get(`${this.urlEndPoint}/page/${page}`,{headers: this.addAuthorizationHeader()});
  }

  public create(document: Document):Observable<Document>
  {
    return this.http.post<Document>(this.urlEndPoint,document,{headers: this.addAuthorizationHeader()});
  }

  public update(document: Document,id: number):Observable<any>
  {
    return this.http.put(`${this.urlEndPoint}/${id}`,document,{headers: this.addAuthorizationHeader()})
  }

  public delete(id: number)
  {
    return this.http.delete(`${this.urlEndPoint}/${id}`,{headers: this.addAuthorizationHeader()});
  }

}
