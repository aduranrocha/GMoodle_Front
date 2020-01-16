import { UserService } from 'src/app/Services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/MyComponents/Users/functions/user/user';
import { ServiceService } from 'src/app/Services/services.service';

import Swal from 'sweetalert2';
import { tap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/MyComponents/Users/functions/auth/auth.service';
import { ModalService } from 'src/app/Services/modal.service';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-student',
  templateUrl: './allusers.component.html',
  styleUrls: ['./allusers.component.css']
})
export class AllusersComponent implements OnInit {
  //Variables to use so we can pagete each user from our DB and to set an alert for the moment an admin wants to delete a user.
  users: User[];
  pagedor: any;
  selectedUser: User;
  private page: number;
  private itemsPerPage: number = 7;
  private totalItems: number;
  
  constructor(
    private ServiceService: ServiceService,
    private _userService: UserService,
    private modalService: ModalService,
    private authService: AuthService,
    private activateRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {

    //pagetion of the users coming from the DB
    this.activateRoute.paramMap.subscribe(params =>
    {
      let page: number = +params.get('page');
    
      if (page == undefined) 
      {
        page = 0; //if is not page, then iniciate it on 0 (?I belive so)
      }
      else if(page > 0)
      {
        page--;
      }
      console.log('page: '+page);

      //Getting users to pagete them (error on the contet part! )
      this.getUsers(page);

      
    });


    //The change between the photos for the user will get notify. Our 'original user' will be set from the original photo to the new one.
    this.modalService.notifyUpload.subscribe(user => {
      this.users = this.users.map(originalUser => {
        if (user.idUser == originalUser.idUser) {
          originalUser.photo = user.photo;
        }
        return originalUser;
      })
    })
  }


  private getUsers(page: number): void
  {
    console.log('Here!!!');
    this._userService.getUsersPaginate(page,this.itemsPerPage).subscribe(response=>
    {
      this.users = response.content as User[];
      this.totalItems = response.totalElements;
      this.page = response.number + 1;
     console.log(response);
    },
    err=>
    {
      console.log(err)
    });
  }

  //Customized sweetalert for notifying the user whether if they want to delete another user or not
  remove(user: User,index: number): void 
  {
    Swal.fire({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar al usuario ${user.name} ${user.lastName}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Yes, Delete',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Do not delete'
    }).then((result) => {
      if (result.value) {

        this._userService.delete(user.idUser).subscribe(response =>
        {
         
          console.log(response);
          this.users.splice(index,1);
        },
        err =>
        {
          console.log(err);
        });
        //Confirmation once the user is deleted
        // this.ServiceService.delete(user.id).subscribe(
        //   () => {
        //     this.users = this.users.filter(cli => cli !== user)
        //     Swal.fire(
        //       'User Deleted!',
        //       `User ${user.name} successfully deleted`, 'success'
        //     )
        //   }
        // )

      }
    });
  }

  //Open modal when the methods are done / called
    openModal(user : User) {
      this.selectedUser = user;
      this.modalService.openModal();
    }

    private goToPage(page: number)
    {
      this.router.navigate(['List/',page]);
    }

    
}