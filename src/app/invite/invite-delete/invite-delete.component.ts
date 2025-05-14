import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {Invite} from "../invite";
import {InviteService} from "../invite.service";

@Component({
  imports: [ RouterLink ],
  selector: 'app-invite-delete',
  templateUrl: './invite-delete.component.html'
})
export class InviteDeleteComponent implements OnInit {
  public invite: Invite = new Invite();
  private id: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private inviteService: InviteService) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.inviteService.getResource(this.id).subscribe(
      invite => this.invite = invite);
  }

  delete(): void {
    this.inviteService.deleteResource(this.invite).subscribe(
      () => {
        this.router.navigate(['']);
      });
  }
}
