import { Injectable, ɵConsole } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { 
    //Authservice is for getting all the information needed to check if the user is admin
    //Router will help to re-direct the user to a certain path if the conditions are meet
  }

  //CanActivate will be used in the path itself (go to app.model.ts) so if the role is admin, then it can active that page. 
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
     // alert(next.data['role']);
    console.log('ROLEGUARD!!!!'); // console confirmation of canActive method 
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']); //if not logged sent the user to login page
      return false;
    }

    let role = next.data['role'] as string; //catch the 'role' insde the token as a string
    
   // console.log('ROLEGUARD->' + next); //Console confirmation of getting the correct role.

    if (this.authService.hasRole(role)) { //if the date insde the token has a 'role' then

      //Conditional: depending of the type of role will send the user to a specific path.
      let route; 
      if (next.data['role'] == 'ROLE_ADMIN') {
        route = '/Admin';
      } else if (next.data['role'] == 'ROLE_STUDENT') {
        route = '/Student';
      } else if (next.data['role'] == 'ROLE_TEACHER') {
        route = '/Teacher'
      }
      this.router.navigate([route]);
    
      return true;
      
    }
  }
}
