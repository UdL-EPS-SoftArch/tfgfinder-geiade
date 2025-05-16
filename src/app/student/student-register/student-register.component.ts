import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location, NgIf } from '@angular/common';
import { AuthenticationBasicService } from '../../login-basic/authentication-basic.service';
import { User } from '../../login-basic/user';
import { Student } from '../student'
import { FormsModule } from "@angular/forms";
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student-register',
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './student-register.component.html'
})
export class StudentRegisterComponent implements OnInit {
  public student: Student = new Student();
  errorMessage = '';
  successMessage = '';

  constructor(
    private router: Router,
    private location: Location,
    private studentService: StudentService,
    private authenticationService: AuthenticationBasicService
  ) {}

  ngOnInit(): void {
    this.student = new Student();
  }

  onSubmit(): void {
    this.student.dtype = 'Student';
    this.studentService.createResource({ body: this.student }).subscribe({
      next: () => {
        this.authenticationService.login(this.student.id, this.student.password).subscribe({
          next: (user: User) => {
            setTimeout(() => {
              this.router.navigate(['users', user.id]);
            }, 0);
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
