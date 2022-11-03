export class Client{
  username: String;
  email: String;
  password: String;
  name: String;
  last_name: String;
  telephone_number: String;
  dni: String;
  amount_reservation: Number;

  constructor(username: String, name: String ,last_name: String, telephone_number: String, dni: String, email: String, password: String, amount_reservation: number) {
    this.username = username;
    this.name = name;
    this.password = password;
    this.last_name = last_name;
    this.telephone_number = telephone_number;
    this.dni = dni;
    this.email = email;
    this.amount_reservation = amount_reservation;
  }

}
