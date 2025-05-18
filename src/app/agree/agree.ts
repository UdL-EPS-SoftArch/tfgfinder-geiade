import { HateoasResource, Resource } from '@lagoshny/ngx-hateoas-client';
import {User} from "../login-basic/user";

@HateoasResource('agrees')
export class Agree extends Resource {
  id: number;
  agreeDate: Date = new Date();
  status: string;
  user: User;
  agree: any;
  uri: string;
  proposal= null; //Proposal

  constructor(values: object = {}) {
    super();
    Object.assign(this as any, values);
  }
}
