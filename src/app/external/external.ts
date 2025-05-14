import { HateoasResource, Resource } from '@lagoshny/ngx-hateoas-client';
import { User } from '../login-basic/user';

@HateoasResource('externals')
export class External extends Resource {
  name: string;
  description?: string;
  website?: string;
  status: string = 'pending'; // o "requested"
  user: User;

  constructor(values: object = {}) {
    super();
    Object.assign(this as any, values);
  }
}
