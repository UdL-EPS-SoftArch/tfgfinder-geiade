import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HateoasResourceOperation, ResourceCollection } from '@lagoshny/ngx-hateoas-client';
import { Proposal } from './proposal';

@Injectable({ providedIn: 'root' })
export class ProposalService extends HateoasResourceOperation<Proposal> {

  constructor() {
    super(Proposal);
  }

  /**
   * Fetch proposals by title (using Spring Data REST's search capabilities).
   * Matches: /proposals/search/findByTitle?title=...
   */
  public findByTitle(title: string): Observable<ResourceCollection<Proposal>> {
    return this.searchCollection('findByTitle', { params: { title } });
  }

  /**
   * Fetch all proposals (using Spring Data REST's /proposals endpoint).
   */
  public getAllProposals(page: number, size: number): Observable<ResourceCollection<Proposal>> {
    return this.searchCollection('findAll', {
      params: {
        page: page.toString(),
        size: size.toString()
      }
    });
  }
}
