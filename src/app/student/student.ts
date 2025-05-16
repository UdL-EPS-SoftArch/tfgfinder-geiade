import { HateoasResource } from '@lagoshny/ngx-hateoas-client';
import { User } from '../login-basic/user';

@HateoasResource('students')
export class Student extends User {
  id: string;
  email: string;
  password: string;
  name: string;
  surname: string;
  dni: string;
  address: string;
  municipality: string;
  postalCode: string;
  phoneNumber: string;
  degree: string;
  dtype = 'Student';
}
