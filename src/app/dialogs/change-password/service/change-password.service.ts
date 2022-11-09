import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, throwError } from 'rxjs';
import {ChangePasswordDto} from "../model/ChangePasswordDto";

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {

  basePath = 'https://sure-service.herokuapp.com/api/v1/users/password';

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

  changePassword(userId: Number, changePasswordDto: ChangePasswordDto): Observable<ChangePasswordDto>{
    return this.http.put<ChangePasswordDto>(`${this.basePath}/${userId}`, JSON.stringify(changePasswordDto), this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
}
