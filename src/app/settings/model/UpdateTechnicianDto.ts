export class UpdateTechnicianDto{
  username: String;
  email: String;
  name: String;
  last_name: String;
  telephone_number: String;
  dni: String;
  professional_profile: String;
  district: String;
  speciality: number;
  valoration: number;
  disponibility: number;

  constructor(username: String, email: String, name: String, last_name: String, telephone_number: String, dni: String, professional_profile: String, district: String, speciality: number, valoration: number, disponibility: number) {
    this.username = username;
    this.email = email;
    this.name = name;
    this.last_name = last_name;
    this.telephone_number = telephone_number;
    this.dni = dni;
    this.professional_profile = professional_profile;
    this.district = district;
    this.speciality = speciality;
    this.valoration = valoration;
    this.disponibility = disponibility;
  }
}
