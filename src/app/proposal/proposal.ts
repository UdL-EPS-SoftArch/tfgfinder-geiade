import {HateoasResource, Resource} from "@lagoshny/ngx-hateoas-client";
import {User} from "../login-basic/user";
import {Category} from "../category/category";

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
  category: Category;

  constructor(values: object = {}) {
    super();
    Object.assign(this as any, values);
  }
}
