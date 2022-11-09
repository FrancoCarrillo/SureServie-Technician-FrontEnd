import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {ReservationService} from "../../services/reservation.service";
import {Reservation} from "../../model/Reservation";
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
  reservations: Array<Reservation> = [];
  allReservation: Array<Reservation> = [];
  reservationForm :FormGroup= this.builder.group({status: this.selected,});
  subscription: Subscription = new Subscription();

  constructor(private reservationService: ReservationService, public builder: FormBuilder,
              public dialog: MatDialog, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getReservationByTechnicianId();

    this.subscription = this.reservationService.getRefresh$().subscribe(() =>{
      this.getReservationByTechnicianId();
    })
  }

  ngOnDestroy():void {
    this.subscription.unsubscribe();
    console.log('Observable cerrado')
  }

  openSnackBar(){
    this._snackBar.open("Updated Reservation Successfully!", "Close", {
      duration: 5000,
      panelClass: ['snackbar-service']
    });
  }

  filterByStatus(){
    if(this.reservationForm.get("status")?.status == "VALID"){
      const status = this.reservationForm.get("status")?.value
      this.reservations = this.allReservation.filter(e=>e.status == status)
    } else{
      alert("Invalid Information")
    }
  }

  getReservationByTechnicianId(){
    this.reservationService.getReservationByTechnicianId(this.technicianId).subscribe( (response: any) => {
      this.allReservation = response;
      this.allReservation = this.allReservation.filter(e=>e.status != 2)

      this.reservations = this.allReservation;
    })
  }

  updateRequest(status: number, reservationId: number, date_of: string){
    const updateService={
      "date_of": date_of,
      "status": status
    }
    this.reservationService.updateReservation(reservationId, updateService).subscribe((response: any) => {
      console.log(response)
    })
    this.buttonClicked = true
    this.openSnackBar()
  }

}
