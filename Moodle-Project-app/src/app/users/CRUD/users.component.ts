import { Component, OnInit } from '@angular/core';
import { User } from '../user/user';
import { StudentService } from 'src/app/service/student.service';

import Swal from 'sweetalert2';
import { tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { ModalService } from 'src/app/service/modal.service';

@Component({
  selector: 'app-student',
  templateUrl: './users.component.html',
  styleUrls: ['./user.component.css']
})
export class StudentComponent implements OnInit {
  //Variables to use so we can pagete each user from our DB and to set an alert for the moment an admin wants to delete a user.
  users: User[];
  pager: any;
  selectedUser: User;

  constructor(
    private StudentService: StudentService,
    private modalService: ModalService,
    private authService: AuthService,
    private activateRoute: ActivatedRoute
  ) { }

  ngOnInit() {

    //pagetion of the users coming from the DB
    this.activateRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page');

      if (!page) {
        page = 0; //if is not page, then iniciate it on 0 (?I belive so)
      }


      //Getting users to pagete them (error on the contet part! )
      this.StudentService.getUser(page).pipe(
        tap((response: any) => {
          console.log('UserComponent : tap 3');
          (response.content as User[]).forEach(user => console.log(user.name)); //goint through each user!
        })
      ).subscribe((response: any) => {
        this.users = response.content as User[];
        this.pager = response;
      });
    });


    //The change between the photos for the user will get notify. Our 'original user' will be set from the original photo to the new one.
    this.modalService.notifyUpload.subscribe(user => {
      this.users = this.users.map(originalUser => {
        if (user.id == originalUser.id) {
          originalUser.photo = user.photo;
        }
        return originalUser;
      })
    })
  }



  //Customized sweetalert for notifying the user whether if they want to delete another user or not
  delete(user: User): void {
    Swal.fire({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar al cliente ${user.name} ${user.lastName}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Yes, Delete',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Do not delete'
    }).then((result) => {
      if (result.value) {

        //Confirmation once the user is deleted
        this.StudentService.delete(user.id).subscribe(
          () => {
            this.users = this.users.filter(cli => cli !== user)
            Swal.fire(
              'User Deleted!',
              `User ${user.name} successfully deleted`, 'success'
            )
          }
        )

      }
    });
  }

  //Open modal when the methods are done / called
    openModal(user : User) {
      this.selectedUser = user;
      this.modalService.openModal();
    }


}