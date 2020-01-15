import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/MyComponents/Users/functions/auth/auth.service';
import { ActivityService } from 'src/app/Services/activity.service';

@Component({
  selector: 'app-evaluations',
  templateUrl: './evaluations.component.html',
  styleUrls: ['./evaluations.component.css']
})
export class EvaluationsComponent implements OnInit {
  private itemsPerPage: number = 1;
  constructor(private authService: AuthService, 
    private _evaluationService: ActivityService ) { }

  ngOnInit() 
  {
  //  this.getActivities(0);
  }

  getEvaluations(page: number)
  {
    // this._activityService.getPaginate(page,this.itemsPerPage).subscribe(response =>
    //   {
    //     console.log(response)
    //   },
    //   err =>
    //   {
    //     console.log(err);
    //   });
  }



}
