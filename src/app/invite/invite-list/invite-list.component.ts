import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {Invite} from "../invite";
import {InviteService} from "../invite.service";
import {PagedResourceCollection} from "@lagoshny/ngx-hateoas-client";
import {NgForOf} from "@angular/common";
import {NgbPagination} from "@ng-bootstrap/ng-bootstrap";
import {UserSearchComponent} from "../../user/user-search/user-search.component";

@Component({
  selector: 'app-invite-list',
  imports: [
    NgForOf,
    NgbPagination,
    UserSearchComponent,
    RouterLink
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
        this.invites = page.resources;
        this.totalInvites = page.totalElements;
      });
  }

  changePage(): void {
    this.inviteService.getPage({ pageParams: { page: this.page - 1, size: this.pageSize }, sort: { username: 'ASC' } }).subscribe(
      (page: PagedResourceCollection<Invite>) => this.invites = page.resources);
  }

  detail(invite: Invite): void {
    this.router.navigate(['myInvites', invite.id]);
  }


}
