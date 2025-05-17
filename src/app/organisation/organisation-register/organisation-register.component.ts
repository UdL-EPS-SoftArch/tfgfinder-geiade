import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location, NgIf } from '@angular/common';
import { AuthenticationBasicService } from '../../login-basic/authentication-basic.service';
import { External } from '../../external/external';
import { FormsModule } from "@angular/forms";
import { ExternalService } from '../../external/external.service';
import {User} from "../../login-basic/user";

@Component({
  selector: 'app-organisation-register',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './organisation-register.component.html'
})
export class OrganisationRegisterComponent implements OnInit {
  external: External = new External();
  errorMessage = '';
  successMessage = '';

  constructor(
    private router: Router,
    private location: Location,
    private externalService: ExternalService,
    private authenticationService: AuthenticationBasicService
  ) {}

  ngOnInit(): void {
    this.external = new External();
  }

  onSubmit(): void {
    this.external.dtype = 'Organisation';

    this.externalService.createResource({ body: this.external }).subscribe({
      next: () => {
        this.authenticationService.login(this.external.id, this.external.password).subscribe({
          next: (user: User) => {
            if (user) {
              this.router.navigate(['/users']);
            } else {
              this.errorMessage = 'No se pudo guardar el usuario tras el login.';
            }
          },
          error: () => this.errorMessage = 'No se pudo iniciar sesión tras el registro.'
        });
      },
      error: () => this.errorMessage = 'No se pudo completar el registro.'
    });
  }



  onCancel(): void {
    this.location.back();
  }
}
