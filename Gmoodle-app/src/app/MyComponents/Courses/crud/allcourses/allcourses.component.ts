import { Component, OnInit } from '@angular/core';
import { CoruseService } from 'src/app/Services/coruse.service';
import { Course } from 'src/app/models/course';
import { AuthService } from 'src/app/MyComponents/Users/functions/auth/auth.service';
import  Swal  from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-allcur',
  templateUrl: './allcourses.component.html',
  styleUrls: ['./allcourses.component.css']
})
export class AllCoursesComponent implements OnInit {

  private page: number;
  private itemsPerPage: number = 7;
  private totalItems: number;
  private courses: Course[];
  constructor(private _courseService: CoruseService,
     private activatedRoute: ActivatedRoute,
     private authService: AuthService,
     private router: Router) { }
  

  ngOnInit() 
  {
    this.activatedRoute.paramMap.subscribe(params =>
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
        this.getCouses(page);
  
        
      });
  }


  private getCouses(page: number)
  {
    this._courseService.getCourses(page,this.itemsPerPage).subscribe(response =>
    {
      //*Add pagination content to course
      this.courses = response.content as Course[];
      this.totalItems = response.totalElements;
      this.page = response.number + 1;
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

  private goToPage(page: number)
  {
    this.router.navigate(['ListCourse/',page]);
  }

}
