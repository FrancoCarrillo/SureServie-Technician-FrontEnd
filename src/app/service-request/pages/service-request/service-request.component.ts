import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServiceRequestService } from '../../services/service-request.service';
import { ConfirmComponent } from '../../dialogs/confirm/confirm.component';
import { CancelComponent } from '../../dialogs/cancel/cancel.component';
@Component({
  selector: 'app-service-request',
  templateUrl: './service-request.component.html',
  styleUrls: ['./service-request.component.css']
})
export class ServiceRequestComponent implements OnInit {

  servicesConfirm: Array<any> = []
  servicesNoConfirm: Array<any> = []
  confirm= true
  service: any
  constructor(private serviceService: ServiceRequestService, private _snackBar: MatSnackBar, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllServices()
  }

  getAllServices(){
    this.serviceService.getServicesByTechnicianId(14).subscribe((response: any)=>{
      for (let index = 0; index < response.length; index++) {
        if(response[index].confirmation==1)
          this.servicesConfirm.push(response[index])
        else this.servicesNoConfirm.push(response[index])
      }
    })
  }

  updateSevice(item: any){
    this.service = item
    this.service.confirmation=1
    localStorage.setItem('service', JSON.stringify(this.service));
    this.openConfirmDialog()
  }

  deleteService(id: number){
    localStorage.setItem('serviceId', JSON.stringify(id));
    this.openCancelDialog()
  }

  openConfirmDialog(): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openCancelDialog(): void {
    const dialogRef = this.dialog.open(CancelComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
