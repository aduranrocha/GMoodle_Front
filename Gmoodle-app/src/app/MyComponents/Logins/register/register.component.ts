import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { User } from '../../Users/functions/user/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  //*FormGroups declaration
  form: FormGroup;
  user: User;

  constructor(private formBuilder: FormBuilder, private _userService: UserService, private router: Router) { }

  ngOnInit() 
  {
    this.formInit();
  }

  private formInit():void 
  {
    this.form = this.formBuilder.group
    ({
      name: ['',Validators.required],
      lastname: ['',Validators.required],
      email: ['',[Validators.required,Validators.email]],
      username: ['',[Validators.required,Validators.minLength(4),Validators.maxLength(20)]],
      password: ['',[Validators.required,Validators.minLength(8)]],
      address: ['',Validators.required],
      phone: ['',Validators.required],
      degree: ['',Validators.required],
      birthDate: ['',Validators.required]
    });
  }

  private save():void
  {
    this.user = new User();
    this.user.name = this.form.get('name').value;
    this.user.lastName = this.form.get('lastname').value;
    this.user.email = this.form.get('email').value;
    this.user.username = this.form.get('username').value;
    this.user.password = this.form.get('password').value;
    this.user.address = this.form.get('address').value;
    this.user.phoneNumber = this.form.get('phone').value;
    this.user.degree = this.form.get('degree').value;
    this.user.birthDay = this.form.get('birthDate').value;
    let role = {name: "ROLE_STUDENT"};
    this.user.roles.push(role);


    this._userService.register(this.user).subscribe(response =>
      {
        console.log(response);
        this.router.navigate(['/Welcome']);
      },
      err =>
      {
        console.log(err);
      })
  }
}