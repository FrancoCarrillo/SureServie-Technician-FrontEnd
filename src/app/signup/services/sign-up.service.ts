import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, throwError} from 'rxjs';
import { SignUpDto } from '../model/SignUpDto';
import {Speciality} from "../model/Speciality";

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  basePath = 'https://sure-service.herokuapp.com/api/v1';

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

  sign_up(newUser: SignUpDto): Observable<SignUpDto>{
    return this.http.post<SignUpDto>(`${this.basePath}/technician/sign-up`, JSON.stringify(newUser), this.httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  getAllSpecialities():Observable<Speciality>{
    return this.http.get<Speciality>(`${this.basePath}/speciality`, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }



}
