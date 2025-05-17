import {HateoasResource, Resource} from "@lagoshny/ngx-hateoas-client";
import {User} from "../login-basic/user";

@HateoasResource('proposals')
export class Proposal extends Resource{
  id: number;
  title: string;
  description: string;
  timing: string;
  speciality: string;
  kind: string;
  keywords: string[];
  user: User;
  category: string[] = []; //TODO: Pending Category Implementation

  constructor(values: object = {}) {
    super();
    Object.assign(this as any, values);
  }
}
