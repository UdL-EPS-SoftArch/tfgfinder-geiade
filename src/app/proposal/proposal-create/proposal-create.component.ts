import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { ProposalService } from '../proposal.service';
import { CategoryService } from '../../category/category.service';
import { Proposal } from '../proposal';
import {Location, NgForOf, NgIf} from '@angular/common';
import { FormsModule } from '@angular/forms';
import {Category} from "../../category/category";
import {PagedResourceCollection} from "@lagoshny/ngx-hateoas-client";


@Component({
  imports: [FormsModule, NgIf, NgForOf],
  selector: 'app-proposal-create',
  templateUrl: './proposal-create.component.html'
})
export class ProposalCreateComponent implements OnInit {
  public proposal: Proposal;
  keywordsInput = '';
  categories: Category[] = [];
  public selectedCategoryId: number | null = null;


  constructor(private router: Router,
              private location: Location,
              private proposalService: ProposalService,
              private categoryService: CategoryService,
              private route: ActivatedRoute) {
  }

  updateKeywords() {
    this.proposal.keywords = this.keywordsInput
        .split(',')
        .map(k => k.trim())
        .filter(k => k.length > 0);
  }

  ngOnInit(): void {
    this.categoryService.getPage({ pageParams: { page: 0, size: 100 } }).subscribe({
      next: (page: PagedResourceCollection<Category>) => {
        this.categories = page.resources;
      },
      error: err => console.error('Error loading categories:', err)
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      // Edit mode: load proposal by id
      this.proposalService.getResource(+id).subscribe({
        next: (proposal: Proposal) => {
          this.proposal = proposal;
          this.keywordsInput = this.proposal.keywords?.join(', ') || '';
        },
        error: err => {
          console.error('Error loading proposal:', err);
          this.proposal = new Proposal(); // fallback
        }
      });
    } else {
      // Create mode: initialize a new proposal
      this.proposal = new Proposal();
    }
  }


  onSubmit(): void {
    this.updateKeywords();
    if (this.proposal.id) {
      // Update existing proposal
      console.log('Updating proposal', this.proposal);
      this.proposalService.updateResource(this.proposal).subscribe({
        next: () => this.router.navigate(['/proposals']),
        error: err => console.error('Update failed:', err)
      });
    } else {
      this.proposalService.createResource({ body: this.proposal }).subscribe({
        next: () => this.router.navigate(['/proposals']),
        error: err => console.error('Creation failed:', err)
      });
    }
  }

  onCancel(): void {
    this.location.back();
  }
}
