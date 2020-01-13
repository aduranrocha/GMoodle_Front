import { Component, OnInit } from '@angular/core';
import { DocumentService } from 'src/app/Services/document.service';
import { AuthService } from '../../Users/functions/auth/auth.service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
  private documents: Document[];
  constructor(private _documentService: DocumentService, private authService: AuthService) { }

  ngOnInit() 
  {
    this.getDocuments(0);
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
}
