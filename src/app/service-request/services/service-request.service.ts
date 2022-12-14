import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, retry, throwError } from 'rxjs';
import {UpdateServiceRequestDto} from "../model/UpdateServiceRequestDto";

@Injectable({
  providedIn: 'root'
})
export class ServiceRequestService {

  basePath='https://sure-service.herokuapp.com/api/v1'

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.log(`An error occurred: ${error.error.message}`);
    } else {
      console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    return throwError(() => new Error('Something happened with request, please try again later'));
  }

  getServicesByTechnicianId(id: number){
    return this.http.get(`${this.basePath}/services/technician/${id}`)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  updateService(id: number, item: UpdateServiceRequestDto){
    return this.http.put<UpdateServiceRequestDto>(`${this.basePath}/services/${id}`, JSON.stringify(item) ,this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

}
