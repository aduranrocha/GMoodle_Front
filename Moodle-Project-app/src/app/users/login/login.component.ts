import { Component, OnInit } from '@angular/core';
import { User } from '../user/user';
import Swal from 'sweetalert2';
import {AuthService} from '../auth/auth.service';
import {Router} from '@angular/router';
import { from } from 'rxjs';

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

login(): void{
  console.log(this.user);
  if(this.user.username == null || this.user.password == null)
  {
    Swal.fire('Error', 'Please enter a valid user and password','error');
    return; 
  }
  this.authService.login(this.user).subscribe(response=> {
    console.log(response);

    let payload = JSON.parse(atob(response.access_token.split(".")[1]));

    console.log(payload);

    this.router.navigate(['/footer']); //change
    
    Swal.fire('Login',`Welcome ${payload.user_name}, you are now logged!`, 'success');
  })
}

}
