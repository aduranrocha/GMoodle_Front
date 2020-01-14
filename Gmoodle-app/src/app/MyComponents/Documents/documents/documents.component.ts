import { Component, OnInit } from '@angular/core';
import { DocumentService } from 'src/app/Services/document.service';
import { AuthService } from '../../Users/functions/auth/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Document } from 'src/app/models/document';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
  private documents: Document[] = [];
  private form: FormGroup;
  private files: File[] = [];
  constructor(private _documentService: DocumentService,
     private authService: AuthService,
     private formBuilder: FormBuilder) { }

  ngOnInit() 
  {
    this.getDocuments(0);
    this.formInit();
  }

  formInit():void 
  {
    this.form = this.formBuilder.group({
      fileName: ['',Validators.required],
      files: [null,Validators.required]
    });
  }

  private getDocuments(page: number)
  {
    this._documentService.getAllPaginate(page).subscribe(response =>
      {
        console.log(response);
        this.documents = response.content as Document[];
      },
      err =>
      {
        console.log(err);
      });
  }

  private onFileSelected(event: any)
  {
    console.log('on selected file')
    let elements = event.target.files.length;

    for(let i = 0; i< elements; i++)
    {
      this.files.push(event.target.files[i]);
    }
    console.log(this.files);
  }

  private uploadFile()
  {
    console.log('upload');
    let document = new Document();
    console.log(this.files[0]);
    this._documentService.upload(this.files[0],1,1).subscribe(response =>{
      console.log(response);
    },
    err =>
    {
      console.log(err);
    }
    );
  }
}
