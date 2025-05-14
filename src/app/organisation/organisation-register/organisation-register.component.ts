import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ExternalService } from '../../external/external-service';
import { External } from '../../external/external';
import { User } from '../../login-basic/user';


@Component({
  selector: 'app-organisation-register',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './organisation-register.component.html'
})
export class OrganisationRegisterComponent {
  registerForm: FormGroup;
  submitted = false;
  errorMessage = '';

  constructor(private fb: FormBuilder,
              private externalService: ExternalService,
              private router: Router) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      website: [''],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) return;

    const user = new User({
      username: this.registerForm.value.username,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      authorities: [{ authority: 'ROLE_ORGANISATION' }]
    });

    const external = new External({
      name: this.registerForm.value.name,
      description: this.registerForm.value.description,
      website: this.registerForm.value.website,
      user: user,
      status: 'pending'
    });

    this.externalService.createResource({ body: external }).subscribe({
      next: () => this.router.navigate(['/login']),
      error: err => this.errorMessage = 'Error registering organisation: ' + err.message
    });
  }
}
