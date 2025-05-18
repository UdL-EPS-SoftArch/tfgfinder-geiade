import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location, NgIf } from '@angular/common';
import { AuthenticationBasicService } from '../../login-basic/authentication-basic.service';
import { Professor } from '../professor';
import { FormsModule } from "@angular/forms";
import { ProfessorService } from '../professor.service';
import {User} from "../../login-basic/user";

@Component({
  selector: 'app-professor-register',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './professor-register.component.html'
})
export class ProfessorRegisterComponent implements OnInit {
  professor: Professor = new Professor();
  errorMessage = '';
  successMessage = '';

  constructor(
    private router: Router,
    private location: Location,
    private professorService: ProfessorService,
    private authenticationService: AuthenticationBasicService
  ) {}

  ngOnInit(): void {
    this.professor = new Professor();
  }


  onSubmit(): void {
    this.professor.dtype = 'Professor';

    this.professorService.createResource({ body: this.professor }).subscribe({
      next: () => {
        this.authenticationService.login(this.professor.username, this.professor.password).subscribe({
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
