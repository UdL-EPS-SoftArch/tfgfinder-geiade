import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationBasicService } from '../../login-basic/authentication-basic.service';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-professor-register',
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './professor-register.component.html'
})
export class ProfessorRegisterComponent {
  registerForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationBasicService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  onSubmit(): void {
    if (this.registerForm.invalid) return;

    this.authService.registerProfessor(this.registerForm.value).subscribe({
      next: () => {
        this.successMessage = 'Registro exitoso. Redirigiendo...';
        this.router.navigate(['/']);
      },
      error: err => {
        this.errorMessage = err.error?.message || 'No se pudo completar el registro.';
      }
    });
  }

  isTouchedAndInvalid(field: string): boolean {
    const control = this.registerForm.get(field);
    return !!(control?.invalid && (control?.touched || control?.dirty));
  }

}
