import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationBasicService } from '../../login-basic/authentication-basic.service';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-organisation-register',
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './organisation-register.component.html'
})
export class OrganisationRegisterComponent {
  registerForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private auth: AuthenticationBasicService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      website: [''],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  onSubmit(): void {
    if (this.registerForm.invalid) return;
    this.auth.registerOrganisation(this.registerForm.value).subscribe({
      next: () => {
        this.successMessage = 'Registro enviado. Tu organización será validada por un administrador. Recibirás un email en menos de 24 horas.';
        setTimeout(() => this.router.navigate(['/login']), 3000);
        this.registerForm.reset();
      },
      error: (err) => {
        this.errorMessage = err.error.message || 'No se pudo completar el registro.';
      }
    });
  }
  isTouchedAndInvalid(field: string): boolean {
    const control = this.registerForm.get(field);
    return !!(control?.invalid && (control?.touched || control?.dirty));
  }


}
