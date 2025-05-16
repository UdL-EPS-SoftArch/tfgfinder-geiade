import { Component, OnInit } from '@angular/core';
import { AuthenticationBasicService } from '../login-basic/authentication-basic.service';
import { RouterModule } from '@angular/router';
import { NgbCollapse, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgIf } from '@angular/common';
import { LoginNavbarComponent } from '../login-basic/login-navbar.component';

@Component({
  imports: [RouterModule, NgbCollapse, NgbDropdownModule, NgIf, LoginNavbarComponent],
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public isCollapsed: boolean;

  constructor(public authService: AuthenticationBasicService) {
  }

  ngOnInit(): void {
    this.isCollapsed = true;
  }

  isLogged(): boolean {
    return this.authService.isLoggedIn();
  }

  isRole(role: string): boolean {
    return this.authService.isRole(role);
  }
}
