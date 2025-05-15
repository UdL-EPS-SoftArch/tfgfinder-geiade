import { HateoasResource, Resource } from '@lagoshny/ngx-hateoas-client';
import { User } from '../login-basic/user';

@HateoasResource('students')
export class Student extends Resource {
  user: User;
  degree?: string;

  constructor(values: object = {}) {
    super();
    Object.assign(this as any, values);
  }
}
