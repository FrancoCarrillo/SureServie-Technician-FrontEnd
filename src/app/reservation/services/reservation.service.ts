import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, retry, Subject, throwError} from "rxjs";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private _refresh$ = new Subject<void>();

  basePath='https://sure-service.herokuapp.com/api/v1'

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  getRefresh$(){
    return this._refresh$;
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.log(`An error occurred: ${error.error.message}`);
    } else {
      console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    return throwError(() => new Error('Something happened with request, please try again later'));
  }

  getServiceRequestByTechnicianId(technicianId: number){
    return this.http.get(`${this.basePath}/services/technician/${technicianId}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  updateServiceRequest(serviceRequestId: number, item: object):Observable<any>{
    return this.http.put(`${this.basePath}/services/${serviceRequestId}`, item, this.httpOptions)
      .pipe(
        tap(() => {
          this._refresh$.next();
        }),
        catchError(this.handleError)
      )
  }

}
