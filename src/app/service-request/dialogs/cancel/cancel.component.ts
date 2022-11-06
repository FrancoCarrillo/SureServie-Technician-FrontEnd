import { Component, OnInit } from '@angular/core';
import { ServiceRequestService } from '../../services/service-request.service';
import {UpdateServiceRequestDto} from "../../model/UpdateServiceRequestDto";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-cancel',
  templateUrl: './cancel.component.html',
  styleUrls: ['./cancel.component.css']
})
export class CancelComponent implements OnInit {

  confirm = false

  constructor(private serviceService: ServiceRequestService, private _snackBar: MatSnackBar) { }

  getCurrentService(){
    let currentService= localStorage.getItem('serviceId')
    if(currentService){
      let service = (JSON.parse(currentService));
      return service;
    }else return null
  }

  ngOnInit(): void {
  }

  cancelRequest(){
    console.log(this.getCurrentService())
    let updateServiceRequestDto = new UpdateServiceRequestDto(0, 0, 2);
    this.serviceService.updateService(this.getCurrentService(), updateServiceRequestDto).subscribe((response: any)=>{
      this.openSnackBar()
      this.reload()
    })
    this.confirm = true
  }

  reload(){
    window.location.reload()
  }

  openSnackBar(){
    this._snackBar.open("Service Reject Successfully!", "Close", {
      duration: 5000,
      panelClass: ['snackbar-service']
    });
  }


}
