import { Component, OnInit } from '@angular/core';
import { CoruseService } from 'src/app/Services/coruse.service';
import { Course } from 'src/app/models/course';
import { AuthService } from 'src/app/MyComponents/Users/functions/auth/auth.service';
import  Swal  from 'sweetalert2';

@Component({
  selector: 'app-allcur',
  templateUrl: './allcourses.component.html',
  styleUrls: ['./allcourses.component.css']
})
export class AllCoursesComponent implements OnInit {

  private courses: Course[];
  constructor(private _courseService: CoruseService, private authService: AuthService) { }
  

  ngOnInit() 
  {
    this.getCouses(0);
  }


  private getCouses(page: number)
  {
    this._courseService.getCourses(page).subscribe(response =>
    {
      //*Add pagination content to course
      this.courses = response.content as Course[];
      console.log(response);
    },  
    err =>
    {
      console.log(err);
    }
    );
  }

  private remove(id: number, index: number)
  {
    console.log('in remove');
    //*Show confirm message before remove
    Swal.fire({
      title: 'Are you sure you want to delete this course?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    })
    .then((result) =>
    {
      if(result.value)
      {
        this._courseService.delete(id).subscribe(response =>
        {
          //*Remove course form array
          this.courses.splice(index,1);
          console.log(response);
          
        },
        err =>
        {
          console.log(err);
        }
        );
      }
      
    });
    
  }

}
