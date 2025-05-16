import { Injectable } from '@angular/core';
import { HateoasResourceOperation } from '@lagoshny/ngx-hateoas-client';
import { Professor } from './professor';

@Injectable({ providedIn: 'root' })
export class ProfessorService extends HateoasResourceOperation<Professor> {
  constructor() {
    super(Professor);
  }
}
