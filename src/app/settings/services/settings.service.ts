import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {Client} from "../model/Client";

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  basePath = 'https://sure-service.herokuapp.com/api/v1/clients';

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

  updateClient(clientId: Number, client: Client): Observable<Client>{
    return this.http.put<Client>(`${this.basePath}/${clientId}`, JSON.stringify(client) ,this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  getClient(clientId: Number): Observable<Client>{
    return this.http.get<Client>(`${this.basePath}/${clientId}` ,this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
}
