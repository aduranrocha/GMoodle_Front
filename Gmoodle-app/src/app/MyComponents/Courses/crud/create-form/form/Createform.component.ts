import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Course } from 'src/app/models/course';
import { CoruseService } from 'src/app/Services/coruse.service';
import { count } from 'rxjs/operators';
import { User } from 'src/app/MyComponents/Users/functions/user/user';
import { UserService } from 'src/app/Services/user.service';
import { AuthService } from 'src/app/MyComponents/Users/functions/auth/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './Createform.component.html',
  styleUrls: ['./Createform.component.css']
})
export class CreateFormComponent implements OnInit {
  private idCourse: number;
  //*Form groups declaration
  private formCreate: FormGroup;
  private formUpdate: FormGroup;
  private formDelete: FormGroup;
  private teachers: User[];

  //*Objects declaration
  course: Course;
  @ViewChild('editButton',{static: true}) editButton;
  constructor(private formBulider: FormBuilder,
     private _courseService: CoruseService,
     private _userService: UserService,
     private _authService: AuthService,
     private activatedRoute: ActivatedRoute) 
  { 
    this.course = new Course();
  } 

  ngOnInit() 
  {
    this.formCreateInit();
    this.getTeachers();
    this.formUpdateInit();
    this.activatedRoute.paramMap.subscribe(params =>
    {
      let id = params.get('id');
      this.idCourse = Number(id);
      console.log(params);
      if(id != undefined)
      {
        this.editButton.nativeElement.click();
        this._courseService.getById(Number(id)).subscribe(response =>
        {
          console.log(response);
        
          this.formUpdate.setValue(
          {
            nameCourse: response.nameCourse,
            teacher: response.users.idUser,
            summary: response.summaryCourse
          });
        },
        err =>
        {
          console.log(err);
        });
      }
    });

  }

  private formCreateInit():void
  {
    this.formCreate = this.formBulider.group(
      {
        nameCourse: ['',Validators.required],
        teacher: ['',Validators.required],
        summary: ['',Validators.required]
      }
    );
  }
  private formUpdateInit():void
  {
    this.formUpdate = this.formBulider.group(
      {
        nameCourse: ['',Validators.required],
        teacher: ['',Validators.required],
        summary: ['',Validators.required]
      }
    );
  }

  
  private create(event: Event)
  {
    console.log(this.formCreate.value);
    event.preventDefault();

    //*Add data form to course
    this.course.nameCourse = this.formCreate.get('nameCourse').value;
    this.course.summaryCourse = this.formCreate.get('summary').value;
    //*Create json with teacher
    let teacher = 
    {
      idUser: this.formCreate.get('teacher').value
    };

    //*Add teacher course
    this.course.users = teacher;

    //*Add id od user logged

    //*this.coruse.createById = this._authService.user.id;
    //?Temporal
    this.course.createById = 1;
    console.log(this.course);
    //*Send course to api
    this._courseService.create(this.course).subscribe(response =>
    {
      console.log(response);
      //Clear from
      this.formCreate.reset();
    },
    err =>
    {
      console.log(err.error);
    });
  }

  private update(event: Event)
  {
    event.preventDefault();
    console.log('ind updated');
     //*Add data form to course
     this.course.nameCourse = this.formUpdate.get('nameCourse').value;
     this.course.summaryCourse = this.formUpdate.get('summary').value;
     //*Create json with teacher
     let teacher = 
     {
       idUser: this.formUpdate.get('teacher').value
     };
 
      //*Add teacher course
      this.course.users = teacher;
      //?Temporal
      this.course.createById = 1;

      this._courseService.update(this.course,this.idCourse).subscribe(response =>
        {
        console.log(response);
        },
        err =>
        {
          console.log(err);
        });

    
  }

  private delete(event: Event)
  {
    let id;
  }

  private getTeachers()
  {
    this._userService.getTeachers().subscribe(response =>
      {
        this.teachers = response.teacher;
        //!console.log(response.teacher);
      },
      err =>
      {
        console.log(err);
      }
      );
  }
}
