import {HateoasResource} from '@lagoshny/ngx-hateoas-client';
import { User } from '../login-basic/user';

@HateoasResource('externals')
export class External extends User {
  username: string;
  email: string;
  password: string;
  name: string;
  surname: string;
  position: string;
  organization: string;
  address: string;
  municipality: string;
  postalCode: string;
  phoneNumber: string;
  dtype = 'Organisation';
  status: string = 'pending';
}
