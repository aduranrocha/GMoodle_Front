import { Component, OnInit } from '@angular/core';
import {AuthService} from 'src/app/MyComponents/Users/functions/auth/auth.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

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
