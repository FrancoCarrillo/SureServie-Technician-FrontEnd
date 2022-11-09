import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UpdateImageService} from "../../service/update-image.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-update-image',
  templateUrl: './update-image.component.html',
  styleUrls: ['./update-image.component.css']
})
export class UpdateImageComponent implements OnInit {

  @ViewChild('imageFile', {read: ElementRef}) imageFile: ElementRef | undefined;

  showConfirmationDialog = false
  showChangeDialog = true
  newImage!: File;
  imageMin!:File;

  update_image = new FormGroup({
    image: new FormControl('', Validators.required)
  })

  constructor(private  updateImageService: UpdateImageService, private _snackbar: MatSnackBar, private dialogRef: MatDialogRef<UpdateImageComponent>) { }


  ngOnInit(): void {
  }

  get image() {
    return this.update_image.get("image");
  }


  onFileChange(event: any): void{
    this.newImage = event.target.files[0];
    const fr = new FileReader();
    fr.onload = (evento: any) => {
      this.imageMin = evento.target.result;
    };
    fr.readAsDataURL(this.newImage);
  }

  onUpload(): void{
    let userId = Number(localStorage?.getItem("id"));
    this.updateImageService.updateImage(userId, this.newImage).subscribe(()=>{
      this.dialogRef.close()
    }, error => {
      alert("Something has happened");
    });
  }
}
