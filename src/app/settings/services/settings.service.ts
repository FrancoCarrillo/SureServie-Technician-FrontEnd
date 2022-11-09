import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {Technician} from "../model/Technician";
import {UpdateTechnicianDto} from "../model/UpdateTechnicianDto";

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  basePath = 'https://sure-service.herokuapp.com/api/v1/technician';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  constructor(private http: HttpClient) {

  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.log(`An error occurred: ${error.error.message}`);
    } else {
      console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    return throwError(() => new Error('Something happened with request, please try again later'));
  }

  updateClient(technicianId: Number, technician: UpdateTechnicianDto): Observable<UpdateTechnicianDto>{
    return this.http.put<UpdateTechnicianDto>(`${this.basePath}/${technicianId}`, JSON.stringify(technician) ,this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  getTechnician(technicianId: Number): Observable<Technician>{
    return this.http.get<Technician>(`${this.basePath}/${technicianId}` ,this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
}
