import { Component, OnInit } from '@angular/core';
import { DocumentService } from 'src/app/Services/document.service';
import { Document } from 'src/app/models/document';

@Component({
  selector: 'app-dash-student',
  templateUrl: './dash-student.component.html',
  styleUrls: ['./dash-student.component.css']
})
export class DashStudentComponent implements OnInit {
  private documents: Document[];
  constructor(private _documentSerive: DocumentService) { }

  ngOnInit() 
  {
    this._documentSerive.getAllPaginate(0,10).subscribe(response =>
      {
        this.documents = response.content;
        console.log(response);
      },
      err =>
      {
        console.log(err);
      }
      );

  }

}
