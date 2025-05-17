import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

import { Proposal } from '../proposal';
import { ProposalService } from '../proposal.service';
import { AuthenticationBasicService } from '../../login-basic/authentication-basic.service';

@Component({
  selector: 'app-proposal-detail',
  imports: [
    RouterLink,
    NgIf
  ],
  templateUrl: './proposal-detail.component.html'
})
export class ProposalDetailComponent implements OnInit {

  public proposal: Proposal = new Proposal();

  constructor(
    private route: ActivatedRoute,
    private proposalService: ProposalService,
    private authService: AuthenticationBasicService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = +idParam;
      this.proposalService.getResource(id).subscribe({
        next: proposal => {
          this.proposal = proposal;

          // Optional: load related category to avoid 404 errors
          if (!this.proposal.category) {
            this.proposalService.loadProposalCategory(proposal).subscribe({
              next: updatedProposal => this.proposal = updatedProposal,
              error: err => console.warn('Category loading failed or no category:', err)
            });
          }
        },
        error: err => {
          console.error('Error loading proposal', err);
        }
      });
    }
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
