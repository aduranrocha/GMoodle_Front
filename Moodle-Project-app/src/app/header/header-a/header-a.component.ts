import { Component, OnInit } from '@angular/core';
import {AuthService} from 'src/app/users/auth/auth.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-header-a',
  templateUrl: './header-a.component.html',
  styleUrls: ['./header-a.component.css']
})
export class HeaderAComponent implements OnInit {

  constructor(private authService : AuthService, private router : Router) { }
  
//Method loging with an alert to tell the user that they are logged out!
  logout():void{
    let username = this.authService.user.username;
    this.authService.logout();
    Swal.fire('Logout', `${username} you have logged out! See you soon.`,'success');
    this.router.navigate(['/login']); 
  }


  ngOnInit() {
  }

}
