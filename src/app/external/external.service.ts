import { Injectable } from '@angular/core';
import { HateoasResourceOperation } from '@lagoshny/ngx-hateoas-client';
import { External } from './external';

@Injectable({ providedIn: 'root' })
export class ExternalService extends HateoasResourceOperation<External> {
  constructor() {
    super(External);
  }
}
