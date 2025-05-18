import {HateoasResource, Resource} from "@lagoshny/ngx-hateoas-client";
import {User} from "../login-basic/user";
import {Category} from "../category/category";

@HateoasResource('proposals')
export class Proposal extends Resource{
  uri: string;
  title: string;
  description: string;
  timing: string;
  speciality: string;
  kind: string;
  keywords: string[];
  user: User;
  category: Category;

  constructor(values: object = {}) {
    super();
    Object.assign(this as any, values);
  }

  get id(): number | null {
    if (this.uri) {
      const match = this.uri.match(/\/proposals\/(\d+)/);
      if (match) {
        return +match[1];
      }
    }
    return null;
  }
}
