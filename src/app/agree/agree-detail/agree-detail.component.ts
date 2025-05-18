import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AgreeService } from '../agree.service';
import { Agree } from '../agree';

@Component({
  selector: 'app-agree-detail',
  imports: [],
  templateUrl: './agree-detail.component.html'
})
export class AgreeDetailComponent {
  public agree: Agree = new Agree();
  public id: string;

  constructor(private route: ActivatedRoute,
              private agreeService: AgreeService) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.agreeService.getResource(this.id).subscribe(
      agree => {
        this.agree = agree;
      });
  }
}
