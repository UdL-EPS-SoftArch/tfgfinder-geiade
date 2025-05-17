import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private router: Router,
              private location: Location,
              private proposalService: ProposalService,
              private categoryService: CategoryService) {
  }

  updateKeywords() {
    this.proposal.keywords = this.keywordsInput
        .split(',')
        .map(k => k.trim())
        .filter(k => k.length > 0);
  }

  ngOnInit(): void {
    this.proposal = new Proposal();

    this.categoryService.getPage({ pageParams: { page: 0, size: 100 } }).subscribe({
      next: (page: PagedResourceCollection<Category>) => {
        this.categories = page.resources;
        console.log('Categories loaded:', this.categories);
      },
      error: err => console.error('Error loading categories:', err)
    });
  }


  onSubmit(): void {
    this.updateKeywords()
    this.proposalService.createResource({ body: this.proposal }).subscribe({
      next: () => this.router.navigate(['/proposals']), // or any success action
      error: err => console.error('Creation failed:', err)
    });
  }

  onCancel(): void {
    this.location.back();
  }
}
