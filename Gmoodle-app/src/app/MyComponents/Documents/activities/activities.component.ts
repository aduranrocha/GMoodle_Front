import { AuthService } from 'src/app/MyComponents/Users/functions/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Activity } from 'src/app/models/activity';
import { ActivityService } from 'src/app/Services/activity.service';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent implements OnInit {
  private itemsPerPage: number = 1;
  private activities: Activity[];
  constructor(private _authService: AuthService, private _activityService: ActivityService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() 
  {

    this.getActivities(0);
  }

  private getActivities(page: number)
  {
    this._activityService.getPaginate(page, this.itemsPerPage).subscribe(response =>
      {
        console.log(response);
        this.activities = response.content as Activity[];
        
        console.log(this.activities[0].users.userName)
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
        this.activities.splice(1,idnex);
      },
      err =>
      {
        console.log(err);
      }
      );
  }
}
