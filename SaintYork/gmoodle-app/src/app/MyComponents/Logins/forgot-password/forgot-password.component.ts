import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';
import { User } from '../../Users/functions/user/user';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  form: FormGroup;
  constructor(private formBuilder: FormBuilder, private _userService: UserService) { }

  ngOnInit() 
  {
    this.formInit();
  }

  private formInit():void 
  {
    this.form = this.formBuilder.group
    ({
      email: ['',[Validators.required, Validators.email]]
    });
  }

  private forgotPassword()
  {
    let user = new User();
    user.email = this.form.get('email').value;
    
    this._userService.forgotPassword(user).subscribe(response=>
    {
      console.log(response);
    },
    err =>
    {
      console.log(err);
    });
  }
}
