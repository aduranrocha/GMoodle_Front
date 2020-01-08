//This modal will present the general information of the user! like a InduvidualRead!
//I dont know, in the tutorials looked cool
import { Component, OnInit, Input } from '@angular/core';
import Swal from 'sweetalert2';
import { User } from 'src/app/users/user/user';
import { StudentService } from 'src/app/service/student.service';
import { AuthService } from 'src/app/users/auth/auth.service';
import { ModalService } from 'src/app/service/modal.service';
import { HttpEventType } from '@angular/common/http';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  @Input() user : User;

  title: string = "User Information";
  private selectedPhoto: File;
  progress: number = 0; //for a progress bar for when an image is been uploaded


  constructor(
    private userService : StudentService,
    private authServe : AuthService,
    private modalService : ModalService
    ) { }

  ngOnInit() {}

  selectPhoto(event){
    this.selectedPhoto = event.target.file[0];
    this.progress = 0;
    console.log(this.selectedPhoto);
    if (this.selectedPhoto.type.indexOf('images')<0){
      Swal.fire('Error selecting image: ','The archive must be an image type', 'error');
      this.selectedPhoto = null;
    }
  }

  uploadPhoto(){
    if(!this.selectPhoto){
      Swal.fire('Error Uploading: ','Please select a photo','error');
    }else {
      this.userService.updloadPhoto(this.selectedPhoto, this.user.id).subscribe(event => {
        if(event.type === HttpEventType.UploadProgress){
          this.progress = Math.round((event.loaded / event.total)* 100); //percent from 0 to 100 depending on the 'load speed' of the image. total being 100.
        }else if (event.type === HttpEventType.Response){
          let response : any = event.body;
          this.user = response.user as User;
          this.modalService.notifyUpload.emit(this.user);
          Swal.fire('Upload Completed!',response.message, 'success');
        }
      });
    }

  }

  
//We close the modal and reset the progress to 0
  closeModal(){
    this.modalService.closeModal();
    this.selectedPhoto = null;
    this.progress = 0;
  }

}
