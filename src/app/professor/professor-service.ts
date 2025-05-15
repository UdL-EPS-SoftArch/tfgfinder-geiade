import { Injectable } from '@angular/core';
import { Professor } from './professor';
import { HateoasResourceOperation } from '@lagoshny/ngx-hateoas-client';

@Injectable({ providedIn: 'root' })
export class ProfessorService extends HateoasResourceOperation<Professor> {
  constructor() {
    super(Professor);
  }
}
