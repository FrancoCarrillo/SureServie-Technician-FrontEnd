import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {LoginDto} from "../../../login/model/LoginDto";

@Injectable({
  providedIn: 'root'
})
export class UpdateImageService {

  basePath = 'https://sure-service.herokuapp.com/api/v1/users/image';



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

  updateImage(userId: number, image: File): Observable<any>{
    const formData = new FormData();
    formData.append('multipartFile', image);
    return this.http.put<any>(`${this.basePath}/${userId}`, formData)
      .pipe(
        catchError(this.handleError)
      );
  }


}
