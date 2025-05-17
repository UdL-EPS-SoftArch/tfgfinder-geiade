import { Component } from '@angular/core';
import { AuthenticationBasicService } from '../login-basic/authentication-basic.service';
import { User } from "../login-basic/user";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  constructor(public authService: AuthenticationBasicService) {}

  getCurrentUser(): User | null {
    return this.authService.getCurrentUser();
  }
}
