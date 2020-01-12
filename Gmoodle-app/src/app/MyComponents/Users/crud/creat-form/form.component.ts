//This is the functionality part for the CRUD form (form.html) where all the create and delete boxtext are!
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/MyComponents/Users/functions/user/user';
import { ServiceService } from 'src/app/Services/services.service';
import {  ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/Services/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})


export class FormComponent implements OnInit 
{
  //*Variables delcaration
  title: string = "Create User";
  
  //*Objects declaration
  //we create a new user and put a nice title!
  private user: User= new User ();
  private formUser: FormGroup;
  
  //*Arrays delcaration
  errors: string [];


  constructor(
    private userService : ServiceService,
    private _userService: UserService,
    private router : Router,
    private activateRouter : ActivatedRoute,
    private formBuilder: FormBuilder
    ){}

    ngOnInit(){
      console.log('HERE!');
      this.formUserInint();

      this.activateRouter.paramMap.subscribe(params =>
        {
          let id = + params.get('id');
          if(id)
          {
            this.userService.getUser(id).subscribe((user) => this.user = user);
          }
      });

      
    }


/**
 **This function initialize the form group user
 */
private formUserInint(): void
{
  this.formUser = this.formBuilder.group(
  {
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    role: ['', Validators.required],
    name: ['', Validators.required],
    lastName: ['', Validators.required],
    address: ['', Validators.required],
    phone: ['', Validators.required],
    degree: ['', Validators.required],
    birthDay: ['', Validators.required],
  });
}

update() : void{
  console.log(this.user);
  this.userService.update(this.user).subscribe(json =>{
    this.router.navigate(['/CRUD']) //this will re-direct to the form page (crud)
    Swal.fire('User Updated!', `${json.message} : ${json.user.name}`, 'success');
  },
  err =>{
    this.errors = err.error.errors as string[];
    console.error('Back-End error code:'+ err.status);
    console.error(err.error.errors);
  }
  )
}

/**
 **This function get the data from user formgroup and send this to service
 */
public save(): void
{
  console.log('In create function');
  //*Add data from form to object user
  this.user.username = this.formUser.get('username').value;
  this.user.email = this.formUser.get('email').value;
  this.user.password= this.formUser.get('password').value;
  this.user.roles = this.formUser.get('role').value;
  this.user.name = this.formUser.get('name').value;
  this.user.lastName = this.formUser.get('lastName').value;
  this.user.address = this.formUser.get('address').value;
  this.user.birthDay = this.formUser.get('birthDay').value;
 
  console.log(JSON.stringify(this.user));
  //*Send user to api
  this._userService.create(this.user).subscribe(response =>
    { 
      console.log(response);
    },
    err => 
    {
      console.log(err);
    });
}




}