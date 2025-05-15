import { HateoasResource, Resource } from '@lagoshny/ngx-hateoas-client';
import { User } from '../login-basic/user';

@HateoasResource('professors')
export class Professor extends Resource {
  user: User;
  department?: string;

  constructor(values: object = {}) {
    super();
    Object.assign(this as any, values);
  }
}
