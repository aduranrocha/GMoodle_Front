import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/MyComponents/Users/functions/auth/auth.service';
import { GroupService } from 'src/app/Services/group.service';

@Component({
  selector: 'app-group-form',
  templateUrl: './group-form.component.html',
  styleUrls: ['./group-form.component.css']
})
export class GroupFormComponent implements OnInit {

  formCreate: FormGroup;
  constructor(private formBuilder: FormBuilder, private _authService: AuthService, private _groupService, GroupService) { }

  ngOnInit() 
  {
    this.formCreateInit();
  }


  formCreateInit(): void
  {
    this.formCreate = this.formBuilder.group({
      name: ['',Validators.required],
      password: ['',Validators.required],
      startDay: ['',Validators.required],
      endDay: ['',Validators.required],
      noStudent: ['',Validators.required],
      summaryGroup: ['',Validators.required],
    });

  }
}
