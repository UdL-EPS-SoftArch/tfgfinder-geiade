import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-type-selection',
  templateUrl: './register-type-selection.component.html'
})
export class RegisterTypeSelectionComponent {
  constructor(private router: Router) {}

  select(type: string) {
    this.router.navigate([`/register-${type}`]);
  }
}
