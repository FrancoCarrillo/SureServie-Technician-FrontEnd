import { Component, OnInit } from '@angular/core';
import { ServiceRequestService } from '../../services/service-request.service';

@Component({
  selector: 'app-cancel',
  templateUrl: './cancel.component.html',
  styleUrls: ['./cancel.component.css']
})
export class CancelComponent implements OnInit {

  confirm = false

  constructor(private serviceService: ServiceRequestService) { }

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
    this.serviceService.deleteService(this.getCurrentService()).subscribe((response: any)=>{
    })
    this.confirm = true
  }

  reload(){
    window.location.reload()
  }
}
