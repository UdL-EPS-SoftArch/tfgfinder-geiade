import { Component, OnInit } from '@angular/core';
import {Agree} from "../agree";
import {AgreeService} from "../agree.service";
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-agree-delete',
  imports: [RouterLink],
  templateUrl: './agree-delete.component.html'
})
export class AgreeDeleteComponent implements OnInit {
  public agree: Agree = new Agree();
  private id: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private agreeService: AgreeService) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.agreeService.getResource(this.id).subscribe(
      agree => this.agree = agree);
  }

  delete(): void {
    this.agreeService.deleteResource(this.agree).subscribe(
      () => {
        this.router.navigate(['']);
      });
  }
}
