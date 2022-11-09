export class Technician{
  id: number;
  username: String;
  name: String;
  last_name: String;
  telephone_number: String;
  dni: String;
  email: String;
  professional_profile: String;
  valoration: number;
  district: String;
  disponibility: number;
  speciality: Speciality;

  constructor(id: number, username: String, name: String, last_name: String, telephone_number: String, dni: String, email: String, professional_profile: String, valoration: number, district: String, disponibility: number, speciality: Speciality) {
    this.id = id;
    this.username = username;
    this.name = name;
    this.last_name = last_name;
    this.telephone_number = telephone_number;
    this.dni = dni;
    this.email = email;
    this.professional_profile = professional_profile;
    this.valoration = valoration;
    this.district = district;
    this.disponibility = disponibility;
    this.speciality = speciality;
  }
}

export class Speciality{
  id: number;
  name: String;

  constructor(id: number, name: String) {
    this.id = id;
    this.name = name;
  }
}
