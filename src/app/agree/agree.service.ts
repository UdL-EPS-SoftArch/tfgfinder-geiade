import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HateoasResourceOperation, ResourceCollection } from '@lagoshny/ngx-hateoas-client';
import { Agree } from './agree';

@Injectable({providedIn: 'root'})
export class AgreeService extends HateoasResourceOperation<Agree> {

  constructor() {
    super(Agree);
  }

  public findByIdContaining(query: number): Observable<ResourceCollection<Agree>> {
    return this.searchCollection('findByIdContaining', { params: { text: query } });
  }
}