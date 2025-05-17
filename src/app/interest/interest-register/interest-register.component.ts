import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InterestService } from '../interest.service';
import { Interest } from '../interest';
import { Location } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-interest-creation',
  templateUrl: './interest-creation.component.html',
  standalone: true,
  imports: [FormsModule]
})
export class InterestCreationComponent implements OnInit {

  public interest: Interest;


  constructor(
    private router: Router,
    private location: Location,
    private interestService: InterestService
  ) {}


  ngOnInit(): void {
    this.interest = new Interest();
  }


  onSubmit(): void {
    this.interestService.createResource({ body: this.interest }).subscribe(
      (createdInterest: Interest) => {
        this.router.navigate(['interests', createdInterest.id]); // Ajusta según la ruta deseada
      }
    );
  }
  

  onCancel(): void {
    this.location.back();
  }
}