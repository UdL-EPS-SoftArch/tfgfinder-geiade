import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {Invite} from '../invite';
import {InviteService} from "../invite.service";
import {FormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";
import {User} from "../../login-basic/user";
import {UserService} from "../../user/user.service";
import {PagedResourceCollection} from "@lagoshny/ngx-hateoas-client";
import {Proposal} from "../../proposal/proposal";
import {ProposalService} from "../../proposal/proposal.service";

@Component({
  selector: 'app-invite-create',
  imports: [
    FormsModule,
    NgForOf
  ],
  templateUrl: './invite-create.component.html'
})

export class InviteCreateComponent implements OnInit {
  public invite: Invite = new Invite();
  public users: User[] = [];
  public proposals: Proposal[] = [];

  constructor(
    public router: Router,
    private inviteService: InviteService,
    private userService: UserService,
    private proposalService: ProposalService
  ) {}

  ngOnInit(): void {
    this.userService.getPage({ pageParams: { page: 0, size: 100 } }).subscribe({
      next: (page: PagedResourceCollection<User>) => {
        this.users = page.resources;
        console.log('Users loaded:', this.users);
      },
      error: err => console.error('Error loading users:', err)
    });

    this.proposalService.getPage({ pageParams: { page: 0, size: 100 } }).subscribe({
      next: (page: PagedResourceCollection<Proposal>) => {
        this.proposals = page.resources;
        console.log('Proposals loaded:', this.proposals);
      },
      error: err => console.error('Error loading proposals:', err)
    });
  }

  onSubmit(): void {
    this.inviteService.createResource({ body: this.invite }).subscribe({
      next: () => {
        this.router.navigate(['/invites']).then(() => {
          console.log('Navigated successfully');
        }).catch(err => {
          console.error('Navigation failed', err);
        });
      },
      error: (error) => {
        console.error('Error creating invite:', error);
      }
    });
  }
}
