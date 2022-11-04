import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { Router } from '@angular/router';
import {Speciality} from "../../model/Speciality";
import {SignUpDto} from "../../model/SignUpDto";
import {SignUpService} from "../../services/sign-up.service";


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  districts = [
    "Ancón",
    "Ate",
    "Barranco",
    "Breña",
    "Carabayllo",
    "Cercado de Lima",
    "Chaclacayo",
    "Chorrillos",
    "Cieneguilla",
    "Comas",
    "El Agustino",
    "Independencia",
    "Jesús María",
    "La Molina",
    "La Victoria",
    "Lince",
    "Los Olivos",
    "Lurigancho",
    "Lurín",
    "Magdalena del Mar",
    "Miraflores",
    "Pachacámac",
    "Pucusana",
    "Pueblo Libre",
    "Puente Piedra",
    "Punta Hermosa",
    "Punta Negra",
    "Rímac",
    "San Bartolo",
    "San Borja",
    "San Isidro",
    "San Juan de Lurigancho",
    "San Juan de Miraflores",
    "San Luis",
    "San Martin de Porres",
    "San Miguel",
    "Santa Anita",
    "Santa María del Mar",
    "Santa Rosa",
    "Santiago de Surco",
    "Surquillo",
    "Villa el Salvador",
    "Villa Maria del Triunfo"
  ]

  specialities:Array<Speciality> = []

  hide = true;
  hide_confirm = true;

  newUser: SignUpDto = new SignUpDto("", "", "", "", "", "", "", "", "", 0);

  signUp = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirm_password: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    last_name: new FormControl('', Validators.required),
    telephone_number: new FormControl('', [Validators.required, Validators.maxLength(9), Validators.minLength(9)]),
    dni: new FormControl('', [Validators.required, Validators.maxLength(8), Validators.minLength(8)]),
    professional_profile: new FormControl('', Validators.required),
    district: new FormControl('', Validators.required),
    speciality: new FormControl('', Validators.required),
  })



  constructor(private signupService: SignUpService, private route: Router) { }

  ngOnInit(): void {
    this.getSpecialities()
  }


  getSpecialities() {
    this.signupService.getAllSpecialities().subscribe((response: any)  => {
      this.specialities = response
    })
  }


  get username() {
    return this.signUp.get('username');
  }
  get email() {
    return this.signUp.get('email');
  }
  get password() {
    return this.signUp.get('password');
  }
  get confirm_password() {
    return this.signUp.get('confirm_password');
  }
  get name() {
    return this.signUp.get('name');
  }
  get last_name() {
    return this.signUp.get('last_name');
  }
  get telephone_number() {
    return this.signUp.get('telephone_number');
  }
  get dni() {
    return this.signUp.get('dni');
  }

  get professional_profile() {
    return this.signUp.get('professional_profile');
  }

  get district() {
    return this.signUp.get('district');
  }

  get speciality() {
    return this.signUp.get('speciality');
  }

  registerUser(): void {
    this.newUser.username = this.signUp.get("username")?.value;
    this.newUser.email = this.signUp.get("email")?.value;
    this.newUser.password = this.signUp.get("password")?.value;
    this.newUser.name = this.signUp.get("name")?.value;
    this.newUser.last_name = this.signUp.get("last_name")?.value;
    this.newUser.telephone_number = this.signUp.get("telephone_number")?.value;
    this.newUser.dni = this.signUp.get("dni")?.value;
    this.newUser.professional_profile = this.signUp.get("professional_profile")?.value;
    this.newUser.district = this.signUp.get("district")?.value;
    this.newUser.speciality = this.signUp.get("speciality")?.value;

    if(this.signUp.status == "VALID"){
      if(this.password?.value != this.confirm_password?.value) {
        alert("Passwords doesn't match")
        return
      }

      this.signupService.sign_up(this.newUser).subscribe((response: any) =>{
        localStorage.setItem("id", response.id)
        this.route.navigate(['/service-request']).then( () =>{
            location.reload()
          }
        );
      }, () =>{
        alert("Information already use")
      })

    } else {
      alert("Missing Information")
    }

  }


}
