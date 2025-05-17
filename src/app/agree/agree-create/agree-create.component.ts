import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {Agree} from '../agree';
import {AgreeService} from "../agree.service";
import {FormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";
import {User} from "../../login-basic/user";
import {UserService} from "../../user/user.service";
import {PagedResourceCollection} from "@lagoshny/ngx-hateoas-client";

@Component({
  selector: 'app-agree-create',
  imports: [FormsModule,
    NgForOf],
  templateUrl: './agree-create.component.html'
})
export class AgreeCreateComponent implements OnInit {
  public agree: Agree = new Agree();
  public users: User[] = [];

  constructor(
      public router: Router,
      private agreeService: AgreeService,
      private userService: UserService
    ) {}
  
    ngOnInit(): void {
      this.userService.getPage({ pageParams: { page: 0, size: 100 } }).subscribe({
        next: (page: PagedResourceCollection<User>) => {
          this.users = page.resources;
          console.log('Users loaded:', this.users);
        },
        error: err => console.error('Error loading users:', err)
      });
    }
  
    onSubmit(): void {
      this.agreeService.createResource({ body: this.agree }).subscribe(
        (agree:Agree) => this.router.navigate([agree.uri])
      );
    }
}
