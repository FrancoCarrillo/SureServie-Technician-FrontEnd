import { Component, OnInit } from '@angular/core';
import {LoginDto} from "../../model/LoginDto";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {LoginService} from "../../services/login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide = true;

  user: LoginDto = new LoginDto("", "");

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', Validators.required),
  })

  constructor(private loginService: LoginService, private route: Router) { }

  ngOnInit(): void {

  }


  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onLogin(){

    this.loginService.sign_in(this.user).subscribe((response: any) => {

      if(response.roles[0] !== "ROLE_TECHNICIAN")
      {
        alert("Wrong username or password")
        return
      }

      localStorage.setItem("id", response.id)
      this.route.navigate(['/service-request']).then( () =>{
          location.reload()
        }
      );
    }, () =>{
      alert("Wrong username or password")
    })

  }

}
