import {Component, OnInit} from '@angular/core';
import {Proposal} from "../proposal";
import {ActivatedRoute, Router} from "@angular/router";
import {ProposalService} from "../proposal.service";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-proposal-delete',
  imports: [ RouterModule],
  templateUrl: './proposal-delete.component.html'
})
export class ProposalDeleteComponent implements OnInit {
  public proposal: Proposal = new Proposal();


  constructor(private route: ActivatedRoute,
              private router: Router,
              private proposalService: ProposalService
  ) {  }

  ngOnInit(): void {
    const id: string = this.route.snapshot.paramMap.get('id')!;  // the `!` asserts it's not null


    this.proposalService.getResource(id).subscribe({
      next: (proposal: Proposal) => {
        this.proposal = proposal;  // Assign the actual Proposal object here
      },
      error: err => console.error('Error loading proposal', err)
    });
  }

  delete(): void {
    this.proposalService.deleteResource(this.proposal).subscribe({
      next: () => this.router.navigate(['/proposals']),
      error: err => console.error('Delete failed', err)
    });
  }


}
