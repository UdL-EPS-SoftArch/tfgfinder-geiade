import {Component, OnInit} from '@angular/core';
import {AuthenticationBasicService} from './authentication-basic.service';
import { Location, NgIf } from '@angular/common';
import {User} from './user';
import {Router} from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule, NgIf],
    selector: 'app-login-form',
    templateUrl: './login-form.component.html'
})
export class LoginFormComponent implements OnInit {
  user: User;
  errorMessage = '';

  constructor(private authenticationService: AuthenticationBasicService,
              private location: Location,
              private router: Router) {
  }

  ngOnInit(): void {
    this.user = new User();
  }

  onSubmit(): void {
    this.authenticationService.login(this.user.id, this.user.password).subscribe({
      next: (user: User) => {
        if (user) {
          this.router.navigate(['/about']);
        } else {
          this.errorMessage = 'No se pudo guardar el usuario tras el login.';
        }
      },
      error: () => this.errorMessage = 'Credenciales incorrectas.'
    });
  }



  onCancel(): void {
    this.location.back();
  }
}
