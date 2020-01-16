import { ActivatedRoute, Router } from '@angular/router';
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
  private documents: Document[];
  private form: FormGroup;
  private page: number;
  private itemsPerPage: number = 7;
  private totalItems: number;

   
  private files: File[] = [];
  constructor(private _documentService: DocumentService,
     private authService: AuthService,
     private activatedRoute: ActivatedRoute,
     private router: Router,
     private formBuilder: FormBuilder) { }

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
        this.getDocuments(page);
  
        
      });
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
    this._documentService.getAllPaginate(page, this.itemsPerPage).subscribe(response =>
      {
        console.log(response);
        this.documents = response.content as Document[];
        this.totalItems = response.totalElements;
        this.page = response.number + 1;

        for(let i = 0; i < this.documents.length; i++)
        {
          let arr = this.documents[i].pathDoucument.split('.');
          this.documents[i].type = arr[arr.length-1];
          console.log(this.documents[i].type);
        }
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
  private remove(id: number, index: number)
  {
    this._documentService.delete(id).subscribe(response =>{
      console.log(response);
      this.documents.splice(index,1);
    },
    err =>
    {
      console.log(err);
    }
    );
  }

  private uploadFile()
  {
    console.log('in upload');
    let document = new Document();
    console.log(this.files[0]);
    let idUser = this.authService.user.idUser;
    this._documentService.upload(this.files[0],idUser,1).subscribe(response =>{
      console.log(response);
    },
    err =>
    {
      console.log(err);
    }
    );
  }

  
  private goToPage(page: number)
  {
    this.router.navigate(['Documents/',page]);
  }
}
