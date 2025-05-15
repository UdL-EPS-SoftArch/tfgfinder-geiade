import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService } from '../student-service';
import { Student } from '../student';
import { User } from '../../login-basic/user';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-student-register',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './student-register.component.html'
})
export class StudentRegisterComponent {
  form: FormGroup;
  submitted = false;
  errorMessage = '';

  constructor(private fb: FormBuilder, private studentService: StudentService, private router: Router) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      degree: ['']
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) return;

    const user = new User({
      username: this.form.value.username,
      email: this.form.value.email,
      password: this.form.value.password,
      authorities: [{ authority: 'ROLE_STUDENT' }]
    });

    const student = new Student({
      user: user,
      degree: this.form.value.degree
    });

    this.studentService.createResource({ body: student }).subscribe({
      next: () => this.router.navigate(['/login']),
      error: err => this.errorMessage = 'Error registering student: ' + err.message
    });
  }

  getTouched(name: string): boolean {
    const control = this.form.get(name);
    return !!(control && control.touched);
  }

  getInvalid(name: string): boolean {
    const control = this.form.get(name);
    return !!(control && control.invalid);
  }

}
