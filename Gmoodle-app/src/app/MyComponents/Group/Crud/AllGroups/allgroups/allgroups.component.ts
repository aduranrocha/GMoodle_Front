import { Component, OnInit } from '@angular/core';
import { GroupService } from 'src/app/Services/group.service';
import { GroupClass } from 'src/app/models/groupclass';
import { UserService } from 'src/app/Services/user.service';
import { AuthService } from 'src/app/MyComponents/Users/functions/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-allgroups',
  templateUrl: './allgroups.component.html',
  styleUrls: ['./allgroups.component.css']
})
export class AllgroupsComponent implements OnInit {
  private groups: GroupClass[];
  private page: number;
  private itemsPerPage: number = 7;
  private totalItems: number;
  constructor(private _groupService: GroupService,  private authService: AuthService,
  private activateRoute: ActivatedRoute,
  private router: Router) { }

  ngOnInit() 
  {
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
        this.getGroups(page);
  
        
      });
  }
  
  private remove(id: number, index: number)
  {
      this._groupService.delete(id).subscribe(response =>{
        console.log(response);
        this.groups.splice(index,1);
      },
      err =>
      {
        console.log(err);
      });
  }

  getGroups(page)
  {
    this._groupService.getPaginate(page,this.itemsPerPage).subscribe(response =>
      {
        console.log(response);
        this.totalItems = response.totalElements;
        this.page = response.number + 1;
        this.groups = response.content as GroupClass[];
      },
      err =>
      {
        console.log(err);
      }
      );
  }

  private goToPage(page: number)
  {
    this.router.navigate(['ListGroup/',page]);
  }


}
