import { AuthService } from 'src/app/MyComponents/Users/functions/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Activity } from 'src/app/models/activity';
import { ActivityService } from 'src/app/Services/activity.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/Services/user.service';
import { Course } from 'src/app/models/course';
import { CoruseService } from 'src/app/Services/coruse.service';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent implements OnInit {
  private activities: Activity[];
  private form: FormGroup;
  private page: number;
  private itemsPerPage: number = 10;
  private totalItems: number;
  private courses: Course[];
  
  constructor(private _authService: AuthService,
     private _activityService: ActivityService, 
     private _courseService: CoruseService,
     private router: Router, 
     private formBuilder: FormBuilder,
     private _userService: UserService,
     private activatedRoute: ActivatedRoute) { }

  ngOnInit ()
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
        this.getActivities(page);
  
        this._courseService.getAll().subscribe(response  =>
          {
            console.log(response);
            this.courses = response as Course[];

          },
          err =>
          {
            console.log(err);
          });
      });


    this.formInit();
  }


  private formInit()
  {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      instructions: ['', Validators.required],
      course: [null, Validators.required]
    });
  }

  private getActivities(page: number)
  {
    this._activityService.getPaginate(page, this.itemsPerPage).subscribe(response =>
      {
        console.log(response);
        this.activities = response.content as Activity[];
        
        console.log(response)
      },
      err =>
      {
        console.log(err);
      });
  }

  private remove(id: number, index: number)
  {
    this._activityService.delete(id).subscribe(response =>
      {
        console.log(response);
        this.activities.splice(1,index);
      },
      err =>
      {
        console.log(err);
      }
      );
  }

      private goToPage(page: number)
    {
      this.router.navigate(['Activities/',page]);
    }

    private create()
    {
      let activity = new Activity();
      activity.titleActivity = this.form.get('name').value;
      activity.instructions = this.form.get('instructions').value;
      activity.users = {idUser: this._authService.user.idUser};
      activity.course = {idCourse: this.form.get('course').value};
      console.log(activity);
      this._activityService.create(activity).subscribe(response =>
        {
          console.log(response);
          this.getActivities(0);
        },
        err =>
        {
          console.log(err);
        }
        );
    }
}
