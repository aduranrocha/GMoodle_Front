import { UserService } from 'src/app/Services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/MyComponents/Users/functions/user/user';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/MyComponents/Users/functions/auth/auth.service';
import { Router } from '@angular/router';
//import { ENETRESET } from 'constants';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  title: string = 'Please Login';
  user: User;

  constructor(private _userService: UserService, private authService: AuthService, private router: Router) {
    this.user = new User();
  }

  ngOnInit() {
  }

  login(): void {
    console.log(this.user);
    if (this.user.username == null || this.user.password == null) {
      Swal.fire('Error', 'Please enter a valid user and password', 'error');
      return;
    }
    this.authService.login(this.user).subscribe(response => {
      console.log(response);

      this.authService.saveUser(response.access_token);
      this.authService.saveToken(response.access_token);

      let user = this.authService.user;

      Swal.fire('Login', `Welcome ${user.username}, you are now logged!`, 'success');

      if(this.authService.user.isDemoUser && this.authService.hasRole('ROLE_STUDENT'))
      {
        this.router.navigate(['/Welcome']);
      }
      
      else if(!this.authService.user.isDemoUser && this.authService.hasRole('ROLE_STUDENT'))
      {
        this.router.navigate(['/Welcome']);
      }
      
      else if (this.authService.hasRole('ROLE_ADMIN'))
      {
        this.router.navigate(['/Admin']);
      }
      
      else if (this.authService.hasRole('ROLE_TEACHER'))
      {
        this.router.navigate(['/Teacher']);
      }

    },
      error => 
      {
        console.log(error)
        if (error.status == 400) {
          Swal.fire('Error', 'User or Password incorrect!', 'error');
        }
      }
    );
  }

}
