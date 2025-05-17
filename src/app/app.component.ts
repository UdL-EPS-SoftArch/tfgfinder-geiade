import { Component } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { ErrorAlertComponent } from './error-handler/error-alert/error-alert.component';
import { RouterOutlet } from '@angular/router';
import { AuthenticationBasicService } from './login-basic/authentication-basic.service';
import { User } from "./login-basic/user";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [NavbarComponent, ErrorAlertComponent, RouterOutlet],
})
export class AppComponent {
  constructor(public authService: AuthenticationBasicService) {}
  title = 'TFG Finder GEIADE';

  getCurrentUser(): User {
    return this.authService.getCurrentUser();
  }
}
