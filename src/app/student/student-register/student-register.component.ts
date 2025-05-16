import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationBasicService } from '../../login-basic/authentication-basic.service';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-student-register',
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './student-register.component.html'
})
export class StudentRegisterComponent {
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

    this.authService.registerStudent(this.registerForm.value).subscribe({
      next: () => {
        this.successMessage = '¡Registro exitoso!';
        this.errorMessage = '';
      },
      error: (err) => {
        console.error('Error en el registro:', err); // 👈 Añade esto
        this.successMessage = '';
        this.errorMessage = 'No se pudo completar el registro.';
      }
    });

  }

  isTouchedAndInvalid(field: string): boolean {
    const control = this.registerForm.get(field);
    return !!(control?.invalid && (control?.touched || control?.dirty));
  }


}
