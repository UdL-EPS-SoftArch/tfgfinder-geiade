import {User} from "../login-basic/user";
import {HateoasResource, Resource} from "@lagoshny/ngx-hateoas-client";

@HateoasResource('invites')
export class Invite extends Resource {
  id: number;
  inviteDate: Date = new Date();
  status: string;
  who: User = new User();
  what: Proposal = new Proposal();

  constructor(values: object = {}) {
    super();
    Object.assign(this , values);
  }

  getIdFromLinks(): string {
    if (this._links?.self?.href) {
      return this._links.self.href.split('/').pop() || '';
    }
    return this.id.toString();
  }
}
