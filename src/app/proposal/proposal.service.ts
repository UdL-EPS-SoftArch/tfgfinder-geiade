import { Injectable } from '@angular/core';
import { Observable, forkJoin, of } from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {HateoasResourceOperation, ResourceCollection} from '@lagoshny/ngx-hateoas-client';

import { Proposal } from './proposal';
import { Category } from '../category/category';

@Injectable({ providedIn: 'root' })
export class ProposalService extends HateoasResourceOperation<Proposal> {

  constructor() {
    super(Proposal);
  }

  /**
   * Fetch proposals by title (Spring Data REST search: /proposals/search/findByTitle)
   */
  public findByTitle(title: string): Observable<ResourceCollection<Proposal>> {
    return this.searchCollection('findByTitle', { params: { title } });
  }

  /**
   * Fetch all proposals with pagination (Spring Data REST: /proposals)
   */
  public getAllProposals(page: number, size: number): Observable<ResourceCollection<Proposal>> {
    return this.searchCollection('findAll', {
      params: {
        page: page.toString(),
        size: size.toString()
      }
    });
  }

  /**
   * Helper: Load the Category relation of a Proposal
   */
  public loadProposalCategory(proposal: Proposal): Observable<Proposal> {
    if (proposal.category) {
      return of(proposal);
    }

    return proposal.getRelation<Category>('category').pipe(
      map(category => {
        proposal.category = category;
        return proposal;
      }),
      catchError(err => {
        if (err.status === 404) {
          proposal.category = null;
          return of(proposal);
        }
        throw err;
      })
    );
  }

  /**
   * Helper: Load categories for a list of proposals
   */
  public loadCategoriesForProposals(proposals: Proposal[]): Observable<Proposal[]> {
    const withCategories$ = proposals.map(p => this.loadProposalCategory(p));
    return forkJoin(withCategories$);
  }
}
