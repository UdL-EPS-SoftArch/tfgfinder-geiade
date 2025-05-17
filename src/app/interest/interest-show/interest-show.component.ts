import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InterestService } from '../interest.service';
import { Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthenticationBasicService } from '../../login-basic/authentication-basic.service';

@Component({
  selector: 'app-interest-show',
  templateUrl: './interest-show.component.html',
  standalone: true
})
export class InterestShowComponent implements OnInit {


  constructor(
    private interestService: InterestService,
    private authService: AuthenticationBasicService
  ) {}


  ngOnInit(): void {
    this.getInterests();
  }


}