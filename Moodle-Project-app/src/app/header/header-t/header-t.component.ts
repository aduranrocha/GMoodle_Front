import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/users/auth/auth.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header-t',
  templateUrl: './header-t.component.html',
  styleUrls: ['./header-t.component.css']
})
export class HeaderTComponent implements OnInit {

  constructor(private authService : AuthService, private router : Router) { }

  logout():void{
    let username = this.authService.user.username;
    this.authService.logout();
    Swal.fire('Logout',`${username} you have logged out! See you soon.`,'success');
    this.router.navigate(['/login']);
  }

  ngOnInit() {
  }

}
