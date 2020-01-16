import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/MyComponents/Users/functions/auth/auth.service';
import { GroupService } from 'src/app/Services/group.service';
import { GroupClass } from 'src/app/models/groupclass';
import { Group } from 'src/app/models/group';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-group-form',
  templateUrl: './group-form.component.html',
  styleUrls: ['./group-form.component.css']
})
export class GroupFormComponent implements OnInit {
  @ViewChild('updateButton',{static: true}) updateButton;

  formCreate: FormGroup;
  formUpdate: FormGroup;
  private group: GroupClass;
  constructor(private formBuilder: FormBuilder, 
    private activatedRouter: ActivatedRoute,
    private _authService: AuthService,
     private _groupService: GroupService) { }

  ngOnInit() 
  {


    this.formCreateInit();
    this.formUpdateInit();
    this.activatedRouter.paramMap.subscribe(params =>
      {
        let id =  params.get('id');
        if(id != undefined)
        {
          this.updateButton.nativeElement.click();
          this.getGroup(Number(id));
         
        }
    });
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

  formUpdateInit(): void
  {
    this.formUpdate = this.formBuilder.group({
      name: ['',Validators.required],
      id: ['',Validators.required],
      password: ['',Validators.required],
      startDay: ['',Validators.required],
      endDay: ['',Validators.required],
      noStudent: ['',Validators.required],
      summaryGroup: ['',Validators.required],
    });
  }

  private create():void
  {
    this.group = new GroupClass();
    this.group.nameGroup = this.formCreate.get('name').value; 
    this.group.enrolmentKey  = this.formCreate.get('password').value; 
    this.group.startDateGroup = this.formCreate.get('startDay').value; 
    this.group.endDateGroup = this.formCreate.get('endDay').value; 
    this.group.numberMax = this.formCreate.get('noStudent').value; 
    this.group.summaryGroup = this.formCreate.get('summaryGroup').value; 

    this.group.createAt = '1990-01-01';
    console.log('in create');
    console.table(this.group);

    this._groupService.create(this.group).subscribe(response =>{
      console.log(response);
      Swal.fire({
        title: 'Created',
        text: `New Group Created!`,
        icon: 'success',
        showConfirmButton: false,
        timer: 1350
      });
    },
    err =>
    {
      console.log(err);
    });
  }

  private getGroup(id: number)
  {
    this._groupService.getById(id).subscribe(response =>
      {
        console.log(response);
        this.group = new GroupClass();
        this.group = response;

        this.formUpdate.setValue({
          name: this.group.nameGroup,
          id: this.group.idGroup,
          password: this.group.enrolmentKey,
          startDay: this.group.startDateGroup,
          endDay: this.group.endDateGroup,
          noStudent: this.group.numberMax,
          summaryGroup: this.group.summaryGroup,
        });
      },
      err =>
      {
        console.log(err);
      });
  }

  private update()
  {
    this.group = new GroupClass();

    this.group.idGroup = this.formUpdate.get('id').value;
    this.group.nameGroup = this.formUpdate.get('name').value;
    this.group.enrolmentKey = this.formUpdate.get('password').value;
    this.group.startDateGroup = this.formUpdate.get('startDay').value;
    this.group.endDateGroup = this.formUpdate.get('endDay').value;
    this.group.numberMax = this.formUpdate.get('noStudent').value;
    this.group.summaryGroup = this.formUpdate.get('summaryGroup').value;
    this.group.createAt = '1990-01-01';
    this._groupService.update(this.group, this.group.idGroup).subscribe(response =>{
      this.formUpdate.reset();
      console.log(response);
    },
    err =>
    {
      console.log(err);
    });
  }
}
