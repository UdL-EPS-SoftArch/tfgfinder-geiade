import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProfessorService } from '../professor-service';
import { Professor } from '../professor';
import { User } from '../../login-basic/user';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-professor-register',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './professor-register.component.html'
})
export class ProfessorRegisterComponent {
  form: FormGroup;
  submitted = false;
  errorMessage = '';

  constructor(private fb: FormBuilder, private professorService: ProfessorService, private router: Router) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      department: ['']
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) return;

    const user = new User({
      username: this.form.value.username,
      email: this.form.value.email,
      password: this.form.value.password,
      authorities: [{ authority: 'ROLE_PROFESSOR' }]
    });

    const professor = new Professor({
      user: user,
      department: this.form.value.department
    });

    this.professorService.createResource({ body: professor }).subscribe({
      next: () => this.router.navigate(['/login']),
      error: err => this.errorMessage = 'Error registering professor: ' + err.message
    });
  }
}
