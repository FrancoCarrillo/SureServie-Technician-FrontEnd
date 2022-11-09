import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'SureService-FrontEnd';

  onLogin = false;

  navItem = [
    {
      "title": "Service Request",
      "router":"service-request",
      "icon": "assignment"
    },
    {
      "title": "Reservation",
      "router":"reservation",
      "icon": "schedule"
    },
    {
      "title": "Settings",
      "router":"settings",
      "icon": "settings"
    }
  ]

  constructor(private route: Router) {
  }


  ngOnInit(): void {
    this.onLogin = localStorage.getItem("id") != null;
  }

  onLogout(): void {
    localStorage.removeItem("id")
    this.route.navigate(['/log-in']).then(() =>{
      location.reload()
    })
  }
}
