import { Component, OnInit } from '@angular/core';
import {ChangePasswordDto} from "../../model/ChangePasswordDto";
import {Router} from "@angular/router";
import {ChangePasswordService} from "../../service/change-password.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  showConfirmationDialog = false
  showChangeDialog = true
  hide = true;
  hide_confirm = true;

  change_password = new FormGroup({
    password: new FormControl('', Validators.required),
    confirm_password: new FormControl('', Validators.required),
  })


  constructor(private changePasswordService: ChangePasswordService, private router: Router) { }

  ngOnInit(): void {
  }

  get password() {
    return this.change_password.get('password');
  }
  get confirm_password() {
    return this.change_password.get('confirm_password');
  }


  changePassword(): void {
    let userId = Number(localStorage.getItem("id"))
    let user = new ChangePasswordDto(this.password?.value, this.confirm_password?.value);

    this.changePasswordService.changePassword(userId, user).subscribe(() =>{
      localStorage.removeItem("id")
      this.router.navigate(['/log-in']).then( () =>{
          location.reload()
        }
      );
    }, () =>{
      alert("Bad Information")
    })

  }

  changeVisibility(show: String){

    if(show == "Change-Password"){
      this.showConfirmationDialog = false
      this.showChangeDialog = true
    }
    if(show == "Confirmation-Dialog"){

      if(this.change_password.status == "VALID"){
        if(this.password?.value != this.confirm_password?.value) {
          alert("Passwords doesn't match")
          return
        }

        this.showConfirmationDialog = true
        this.showChangeDialog = false

      } else {
        alert("Missing Information")
      }
    }

  }

}
