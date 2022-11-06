import { Component, OnInit } from '@angular/core';
import { throws } from 'assert';
import { ServiceRequestService } from '../../services/service-request.service';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UpdateServiceRequestDto} from "../../model/UpdateServiceRequestDto";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {

  showConfirmationDialog = false
  showConfirmServiceRequest = true

  service_request = new FormGroup({
    service_price: new FormControl('', Validators.required),
    reservation_price: new FormControl('', Validators.required),
  })


  constructor( private serviceService: ServiceRequestService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  get service_price() {
    return this.service_request.get('service_price');
  }
  get reservation_price() {
    return this.service_request.get('reservation_price');
  }


  confirmService(): void {

    let updateServiceDto = new UpdateServiceRequestDto(this.service_price?.value, this.reservation_price?.value, 1)

    let serviceRequestJSON = localStorage.getItem("service")

    if(serviceRequestJSON){
      var serviceRequest = (JSON.parse(serviceRequestJSON))
    }

    this.serviceService.updateService(serviceRequest.id, updateServiceDto).subscribe(() =>{
      this.openSnackBar()
      window.location.reload()
    })
  }

  openSnackBar(){
    this._snackBar.open("Service Confirm Successfully!", "Close", {
      duration: 5000,
      panelClass: ['snackbar-service']
    });
  }

  changeVisibility(show: String){

    if(show == "Confirm-Service"){
      this.showConfirmationDialog = false
      this.showConfirmServiceRequest = true
    }
    if(show == "Confirmation-Dialog"){

      if(this.service_request.status == "VALID"){
        this.showConfirmationDialog = true
        this.showConfirmServiceRequest = false

      } else {
        alert("Missing Information")
      }
    }

  }
}
