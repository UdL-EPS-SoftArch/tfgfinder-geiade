import {Component} from '@angular/core';
import {AuthenticationBasicService} from './authentication-basic.service';
import {User} from './user';
import { Router, RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  imports: [RouterModule, NgIf],
    selector: 'app-login-navbar,[app-login-navbar]',
    templateUrl: './login-navbar.component.html',
    styleUrls: []
})
export class LoginNavbarComponent {

  constructor(public authService: AuthenticationBasicService, private router: Router) {}

  getCurrentUser(): User {
    return this.authService.getCurrentUser();
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  isRole(role: string): boolean {
    return this.authService.isRole(role);
  }

  logout(event): void {
    event.preventDefault();
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
