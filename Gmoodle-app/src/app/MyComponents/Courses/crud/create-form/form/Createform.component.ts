import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Course } from 'src/app/models/course';
import { CoruseService } from 'src/app/Services/coruse.service';
import { count } from 'rxjs/operators';

@Component({
  selector: 'app-form',
  templateUrl: './Createform.component.html',
  styleUrls: ['./Createform.component.css']
})
export class CreateFormComponent implements OnInit {

  //*Form groups declaration
  private formCreate: FormGroup;
  private formUpdate: FormGroup;
  private formDelete: FormGroup;

  //*Objects declaration
  coruse: Course;
  
  //*Model teachers
  teachers = 
  [
    {
      idUser: 3,
      name: 'Macho',
      lastName: 'Macho'
    },
    {
      idUser: 9,
      name: 'Leo',
      lastName: 'Leo'
    }
  ];
  constructor(private formBulider: FormBuilder, private _courseService: CoruseService) 
  { 
    this.coruse = new Course();
  } 

  ngOnInit() 
  {
    this.formCreateInit();
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

  
  private create(event: Event)
  {
    console.log(this.formCreate.value);
    event.preventDefault();

    //*Add data form to course
    this.coruse.nameCourse = this.formCreate.get('nameCourse').value;
    this.coruse.summaryCourse = this.formCreate.get('summary').value;
    //*Create json with teacher
    let teacher = 
    {
      idUser: this.formCreate.get('teacher').value
    };

    //*Add teacher course
    this.coruse.users = teacher;

    //*Send course to api
    this._courseService.create(this.coruse).subscribe(response =>
    {
      console.log(response);
    },
    err =>
    {
      console.log(err.error);
    });
  }

  private update(event: Event)
  {
    
  }

  private delete(event: Event)
  {
    let id;
  }
}
