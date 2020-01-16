import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Users/functions/auth/auth.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

}
