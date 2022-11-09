import { Component, OnInit } from '@angular/core';
import { throws } from 'assert';
import { ServiceRequestService } from '../../services/service-request.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {

  confirm = false
  constructor(private serviceService: ServiceRequestService) { }

  ngOnInit(): void {
  }

  getCurrentService(){
    let currentService= localStorage.getItem('service')
    if(currentService){
      let service = (JSON.parse(currentService));
      return service;
    }else return null
  }


  confirmRequest(){
    this.serviceService.updateService(this.getCurrentService().id,this.getCurrentService()).subscribe((response: any)=>{
    })
    this.confirm = true
  }

  reload(){
    window.location.reload()
  }
}
