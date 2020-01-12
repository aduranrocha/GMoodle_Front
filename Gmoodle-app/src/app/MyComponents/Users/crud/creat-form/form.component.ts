//This is the functionality part for the CRUD form (form.html) where all the create and delete boxtext are!
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/MyComponents/Users/functions/user/user';
import { ServiceService } from 'src/app/Services/services.service';
import {  ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})

export class FormComponent implements OnInit {
  //we create a new user and put a nice title!
  private user: User= new User ();
  title: string = "Create User";
  errors: string [];

  constructor(
    private userService : ServiceService,
    private router : Router,
    private activateRouter : ActivatedRoute
    ){}

    ngOnInit(){
      this.activateRouter.paramMap.subscribe(params =>{
        let id = + params.get('id');
        if(id){
          this.userService.getUser(id).subscribe((user) => this.user = user);
        }
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




}