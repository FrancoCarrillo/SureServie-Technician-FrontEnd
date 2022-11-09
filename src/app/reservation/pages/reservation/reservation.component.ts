import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {ReservationService} from "../../services/reservation.service";
import {ServiceRequest} from "../../model/ServiceRequest";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Subject, Subscription} from "rxjs";

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit, OnDestroy {
  selected = new FormControl()
  buttonClicked = false;
  technicianId: number = +localStorage.getItem("id")!;
  serviceRequest: Array<ServiceRequest> = [];
  allServiceRequest: Array<ServiceRequest> = [];
  reservationForm :FormGroup= this.builder.group({status: this.selected,});
  subscription: Subscription = new Subscription();

  constructor(private reservationService: ReservationService, public builder: FormBuilder,
              public dialog: MatDialog, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getServiceRequestByTechnicianId();

    this.subscription = this.reservationService.getRefresh$().subscribe(() =>{
      this.getServiceRequestByTechnicianId();
    })
  }

  ngOnDestroy():void {
    this.subscription.unsubscribe();
    console.log('Observable cerrado')
  }

  openSnackBar(){
    this._snackBar.open("Service response successful!", "Close", {
      duration: 5000,
      panelClass: ['snackbar-service']
    });
  }

  filterByStatus(){
    if(this.reservationForm.get("status")?.status == "VALID"){
      const status = this.reservationForm.get("status")?.value
      this.serviceRequest = this.allServiceRequest.filter(e=>e.confirmation == status)
    } else{
      alert("Invalid Information")
    }
  }

  getServiceRequestByTechnicianId(){
    this.reservationService.getServiceRequestByTechnicianId(this.technicianId).subscribe( (response: any) => {
      this.allServiceRequest = response;
      this.allServiceRequest = this.allServiceRequest.filter(e=>e.confirmation != 3)
      this.serviceRequest = this.allServiceRequest;
    })
  }

  updateRequest(confirmation: number, reservationId: number, totalPrince: number, reservationPrice: number){
    const updateService={
      "total_price": totalPrince,
      "reservation_price": reservationPrice,
      "confirmation": confirmation
    }
    this.reservationService.updateServiceRequest(reservationId, updateService).subscribe((response: any) => {
      console.log(response)
    })
    this.buttonClicked = true
    this.openSnackBar()
  }

}
