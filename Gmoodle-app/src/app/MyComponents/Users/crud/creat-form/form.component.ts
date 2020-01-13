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
  private formUserUpdate: FormGroup;
  private formUserDelete: FormGroup;
  
  //*Arrays delcaration
  errors: string [];
  //*Array with roles for ng-select
  private rolesModel = 
  [
   {id: 'ROLE_ADMIN', name: 'ADMIN'},
   {id: 'ROLE_TEACHER', name: 'TEACHER'}
  ];

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
      this.formUserUpdateInint();
      this.formUserDeleteInint();
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
 **This function initialize the form group for create user
 */
private formUserInint(): void
{
  this.formUser = this.formBuilder.group(
  {
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    roles: ['', Validators.required],
    name: ['', Validators.required],
    lastName: ['', Validators.required],
    address: ['', Validators.required],
    phone: ['', Validators.required],
    degree: ['', Validators.required],
    birthDay: ['', Validators.required],
  });
}
/**
 **This function initialize the form group for update user
 */
private formUserUpdateInint(): void
{
  this.formUserUpdate = this.formBuilder.group(
  {
    id: ['',Validators.required],
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    roles: ['', Validators.required],
    name: ['', Validators.required],
    lastName: ['', Validators.required],
    address: ['', Validators.required],
    phone: ['', Validators.required],
    degree: ['', Validators.required],
    birthDay: ['', Validators.required],
  });
}

/**
 **This function initialize the form group for create user
 */
private formUserDeleteInint(): void
{
  this.formUserDelete = this.formBuilder.group(
  {
    id: ['', Validators.required],
  });
}


update(event: Event) : void{
  //*Prevent refresh page
  event.preventDefault();

  //*Add data from form to object user
  this.user.id = this.formUserUpdate.get('id').value;
  this.user.username = this.formUserUpdate.get('username').value;
  this.user.email = this.formUserUpdate.get('email').value;
  this.user.password= this.formUserUpdate.get('password').value;
  this.user.name = this.formUserUpdate.get('name').value;
  this.user.lastName = this.formUserUpdate.get('lastName').value;
  this.user.address = this.formUserUpdate.get('address').value;
  this.user.birthDay = this.formUserUpdate.get('birthDay').value;
  this.user.phoneNumber = this.formUserUpdate.get('phone').value;

  //*Create array with roles
  let roles = this.formUserUpdate.get('roles').value;
 //*Add roles to user
  for(let role of roles)
  {
    this.user.roles.push({name: role});
  }
  
  //*Send user to ap
  this.userService.update(this.user).subscribe(json =>
  {
    console.log(json);
    this.router.navigate(['/CRUD']) //this will re-direct to the form page (crud)
    Swal.fire('User Updated!', `${json.message} : ${json.user.name}`, 'success');
    //Clear form
    this.formUserUpdate.reset();
  },
  err =>{
    console.log(err);
    this.errors = err.error.errors as string[];
    console.error('Back-End error code:'+ err.status);
    console.error(err.error.errors);
  });
}

/**
 **This function get the data from user formgroup and send this to service
 */
public save(event: Event): void
{
  //*Prevent refresh page
  event.preventDefault();
  console.log('In save function');

  //*Add data from form to object user
  this.user.username = this.formUser.get('username').value;
  this.user.email = this.formUser.get('email').value;
  this.user.password= this.formUser.get('password').value;
  this.user.name = this.formUser.get('name').value;
  this.user.lastName = this.formUser.get('lastName').value;
  this.user.address = this.formUser.get('address').value;
  this.user.birthDay = this.formUser.get('birthDay').value;
  this.user.phoneNumber = this.formUser.get('phone').value;
 
  //*Create array with roles
  let roles = this.formUser.get('roles').value;
 //*Add roles to user
  for(let role of roles)
  {
    this.user.roles.push({name: role});
  }

  //*Send user to api
  this._userService.create(this.user).subscribe(response =>
    { 
      console.log(response);
      Swal.fire('User Created!','message', 'success');
      //Clear form
      this.formUser.reset();
    },
    err => 
    {
      console.log(err);
    });
}

private delete(event: Event):void 
{
  //Prevent refresh page
  event.preventDefault();
  console.log('In delete')
  //Get id
  let id = this.formUserDelete.get('id').value;
  console.log(id);
  this._userService.delete(id).subscribe(response =>
    {
      console.log(response);
    },
    err =>
    {
      console.log(err);
    });
}

public getUser(): void
{

}




}