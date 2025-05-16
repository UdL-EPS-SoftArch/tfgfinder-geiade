// app.component.ts
import { Component, Renderer2, OnInit, OnDestroy } from '@angular/core';
import { AuthenticationBasicService } from './login-basic/authentication-basic.service';
import { Subscription } from 'rxjs';
import {NavbarComponent} from "./navbar/navbar.component";
import {ErrorAlertComponent} from "./error-handler/error-alert/error-alert.component";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [
    NavbarComponent,
    ErrorAlertComponent,
    RouterOutlet
  ],
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  private userSub: Subscription;

  constructor(
    private authService: AuthenticationBasicService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.userSub = this.authService.currentUser$.subscribe(user => {
      if (user?.id) {
        this.renderer.setAttribute(document.body, 'data-current-user', user.id);
      } else {
        this.renderer.removeAttribute(document.body, 'data-current-user');
      }
    });
  }


  ngOnDestroy(): void {
    this.userSub?.unsubscribe();
  }
}
