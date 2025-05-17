import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {Invite} from "../invite";
import {InviteService} from "../invite.service";
import {PagedResourceCollection} from "@lagoshny/ngx-hateoas-client";
import {NgForOf, NgIf} from "@angular/common";
import {NgbPagination} from "@ng-bootstrap/ng-bootstrap";
import {User} from "../../login-basic/user";

@Component({
  selector: 'app-invite-list',
  imports: [
    NgForOf,
    NgbPagination,
    RouterLink,
    NgIf
  ],
  templateUrl: './invite-list.component.html'
})
export class InviteListComponent implements OnInit{
  public invites: Invite[] = [];
  public pageSize = 5;
  public page = 1;
  public totalInvites = 0;

  constructor(
    public router: Router,
    private inviteService: InviteService) {
  }

  ngOnInit(): void {
    this.inviteService.getPage({ pageParams:  { size: this.pageSize }, sort: { username: 'ASC' } }).subscribe(
      (page: PagedResourceCollection<Invite>) => {
        console.log("Invites loaded:", page.resources); // <-- Verifica el contenido aquí
        this.invites = page.resources;

        for (const invite of this.invites) {
          const href = (invite as any)._links?.self?.href;
          const idStr = href?.split('/').pop();
          invite.id = Number(idStr);

          invite.getRelation<User>('who').subscribe(user => invite.who = user);
          //invite.getRelation<any>('what').subscribe(what => invite.what = what);
        }
        this.totalInvites = page.totalElements;
      });
  }

  changePage(): void {
    this.inviteService.getPage({ pageParams: { page: this.page - 1, size: this.pageSize }, sort: { username: 'ASC' } }).subscribe(
      (page: PagedResourceCollection<Invite>) => this.invites = page.resources);

    for (const invite of this.invites) {
      const href = (invite as any)._links?.self?.href;
      const idStr = href?.split('/').pop();
      invite.id = Number(idStr);

      invite.getRelation<User>('who').subscribe(user => invite.who = user);
      //invite.getRelation<any>('what').subscribe(what => invite.what = what);
    }
  }

}
