export class SignUpDto{
  username: String;
  email: String;
  password: String;
  name: String;
  last_name: String;
  telephone_number: String;
  dni: String;
  professional_profile: String;
  district: String;
  speciality: Number;

  constructor(username: String,
              email: String,
              password: String,
              name: String,
              last_name: String,
              telephone_number: String,
              dni: String,
              professional_profile: String,
              district: String,
              speciality: Number) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.name = name;
    this.last_name = last_name;
    this.telephone_number = telephone_number;
    this.dni = dni;
    this.professional_profile =professional_profile;
    this.district =district;
    this.speciality =speciality;
  }



}
