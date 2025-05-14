import { Injectable } from '@angular/core';
import { External } from './external';
import { HateoasResourceOperation } from '@lagoshny/ngx-hateoas-client';

@Injectable({ providedIn: 'root' })
export class ExternalService extends HateoasResourceOperation<External> {
  constructor() {
    super(External);
  }
}
