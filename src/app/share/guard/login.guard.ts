import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private router: Router) {
  }

  canActivate(): boolean {

    let id = localStorage.getItem("id")

    if(id != null){
      this.router.navigate(['/service-request' +
      ''])
      return false;
    }

    return true;

  }

}
