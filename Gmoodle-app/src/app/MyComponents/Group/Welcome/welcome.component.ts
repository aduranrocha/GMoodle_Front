import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GroupService } from './../../../Services/group.service';
import { Component, OnInit } from '@angular/core';
import { GroupClass } from 'src/app/models/groupclass';
import { UserService } from 'src/app/Services/user.service';
import { AuthService } from '../../Users/functions/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  private groupClass: GroupClass[];
  private groupName: string;
  private groupId: number;
  private form: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private _userService: UserService,
    private _authService: AuthService,
    private router: Router,
    private _groupService: GroupService) { }

  ngOnInit() 
  {
    console.log('here');
    this._groupService.getAll().subscribe(response =>
      {
        this.groupClass = response;
      },
      err =>
      {
        console.log(err);
      }
      )
  }

  private formInit():void
  {
    this.form = this.formBuilder.group
    ({
      password: ['',Validators.required]
    });
  }

  private choose(index: number):void
  {
    this.groupId = this.groupClass[index].idGroup;
    this.groupName = this.groupClass[index].nameGroup;
  }

  private join(group):void 
  {
    this._userService.join(this._authService.user.idUser,group).subscribe(response =>
      {
        console.log(response);
        this.router.navigate(['/Student']);
      },
      err =>
      {
        console.log(err);
      });
  }

}
