import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {SettingsService} from "../../services/settings.service";
import {Speciality, Technician} from "../../model/Technician";
import {MatDialog} from "@angular/material/dialog";
import {ChangePasswordComponent}from "../../../dialogs/change-password/pages/change-password/change-password.component";
import {UpdateTechnicianDto} from "../../model/UpdateTechnicianDto";
import {UpdateImageComponent} from "../../../dialogs/update-image/pages/update-image/update-image.component";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

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


  enable: boolean = false
  technicianId: Number = 0;
  technician: Technician = new Technician(0, "", "", "", "",  "", "", "", 0, "", 0, new Speciality(0, ""), "", "");

  settingsForm = new FormGroup({
    name: new FormControl(),
    lastname: new FormControl(),
    telephone_number: new FormControl(),
    id_number: new FormControl(),
    username: new FormControl(),
    email: new FormControl(),
    professional_profile: new FormControl(),
    district: new FormControl(),
  })

  constructor(private settingsService: SettingsService,  private dialog: MatDialog) {}

  ngOnInit(): void {
    this.technicianId = Number(localStorage?.getItem("id"))
    this.getTechnician()
    this.settingsForm.disable()
  }

  getTechnician(){
    this.settingsService.getTechnician(this.technicianId).subscribe((response: any) => {
      this.technician = response
    })
  }

  editForm(): void {
    this.settingsForm.enable()
    this.enable = true
  }

  cancelEditForm(): void {
    this.settingsForm.disable()
    this.enable = false
  }

  saveData(): void{

    let updateTechnician = new UpdateTechnicianDto(
      this.technician.username,
      this.technician.email,
      this.technician.name,
      this.technician.last_name,
      this.technician.telephone_number,
      this.technician.dni,
      this.technician.professional_profile,
      this.technician.district,
      this.technician.speciality.id,
      this.technician.valoration,
      this.technician.disponibility,
    )

    this.settingsService.updateClient(this.technicianId, updateTechnician).subscribe((response:any) => {
      this.getTechnician()
      this.settingsForm.disable()
      this.enable = false
    }, (e)=>{
      console.log(e)
    })
  }

  changePassword(): void {
    const dialogRef = this.dialog.open(ChangePasswordComponent)
    dialogRef.afterClosed().subscribe();
  }

  updateImage(): void {
    const dialogRef = this.dialog.open(UpdateImageComponent)
    dialogRef.afterClosed().subscribe(e=>{
      this.getTechnician()
    });
  }

}
