import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/MyComponents/Users/functions/user/user';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/MyComponents/Users/functions/auth/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  title: string = 'Please Login';
  user: User;

  constructor(private authService: AuthService, private router: Router) {
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
      this.router.navigate(['/Admin']);

    },
      error => {
        if (error.status == 400) {
          Swal.fire('Error', 'User or Password incorrect!', 'error');
        }
      }
    );
  }

}
