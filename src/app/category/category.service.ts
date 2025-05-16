import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HateoasResourceOperation, ResourceCollection } from '@lagoshny/ngx-hateoas-client';
import { Category } from './category';


@Injectable({
  providedIn: 'root'
})
export class CategoryService extends HateoasResourceOperation<Category> {

  constructor() {
    super(Category);
  }

  public findByName(name: string): Observable<Category> {
    return this.searchResource('findByName', { params:{ name } });
  }

  public findByNameContainingIgnoreCase(name: string): Observable<ResourceCollection<Category>> {
    return this.searchCollection('findByNameContainingIgnoreCase', { params: { name } });
  }



}
