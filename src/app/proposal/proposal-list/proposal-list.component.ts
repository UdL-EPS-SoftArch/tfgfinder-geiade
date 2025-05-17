import { Router, RouterLink } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PagedResourceCollection } from '@lagoshny/ngx-hateoas-client';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import {NgForOf, NgIf} from '@angular/common';
import { ProposalService} from "../proposal.service";
import {Proposal} from "../proposal";

@Component({
  imports: [RouterLink, NgbPagination, NgForOf, NgIf],
  selector: 'app-proposals-list',
  templateUrl: './proposal-list.component.html'
})
export class ProposalListComponent implements OnInit {
  public proposals: Proposal[] = [];
  public pageSize = 5;
  public page = 1;
  public totalProposals = 0;

  constructor(
    public router: Router,
    private proposalService: ProposalService) {
  }

  ngOnInit(): void {
    this.proposalService.getPage({ pageParams: { size: this.pageSize }, sort: { title: 'ASC' } }).subscribe(
      (page: PagedResourceCollection<Proposal>) => {
        this.totalProposals = page.totalElements;
        this.proposalService.loadCategoriesForProposals(page.resources).subscribe(
          (proposalsWithCategories: Proposal[]) => {
            this.proposals = proposalsWithCategories;
          }
        );
      });
  }

  changePage(): void {
    this.proposalService.getPage({ pageParams: { page: this.page - 1, size: this.pageSize }, sort: { username: 'ASC' } }).subscribe(
      (page: PagedResourceCollection<Proposal>) => {
        this.proposalService.loadCategoriesForProposals(page.resources).subscribe(
          (proposalsWithCategories: Proposal[]) => {
            this.proposals = proposalsWithCategories;
          }
        );
      });
  }


  detail(proposal: Proposal): void {
    this.router.navigate(['proposals', proposal.id]);
  }
}
