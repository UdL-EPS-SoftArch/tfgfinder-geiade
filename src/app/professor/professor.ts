import { User } from '../login-basic/user';
import { HateoasResource } from '@lagoshny/ngx-hateoas-client';

@HateoasResource('professors')
export class Professor extends User {
  username: string;
  email: string;
  password: string;
  name: string;
  surname: string;
  faculty: string;
  department: string;
  dtype = 'Professor';
}
