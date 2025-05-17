import { HateoasResource, Resource } from '@lagoshny/ngx-hateoas-client';
import {User} from "../login-basic/user";
import {Proposal} from "../proposal/proposal"

@HateoasResource('agrees')
export class Agree extends Resource {
  id: number;
  agreeDate: Date = new Date();
  status: string;
  who: User = new User();
  agree: any;
  uri: string;
  what: Proposal = new Proposal();

  constructor(values: object = {}) {
    super();
    Object.assign(this as any, values);
  }
}
