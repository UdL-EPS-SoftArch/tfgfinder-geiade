import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {Agree} from "../agree";
import {AgreeService} from "../agree.service";
import {PagedResourceCollection} from "@lagoshny/ngx-hateoas-client";
import {NgForOf, NgIf} from "@angular/common";
import {NgbPagination} from "@ng-bootstrap/ng-bootstrap";
import {User} from "../../login-basic/user";

@Component({
  selector: 'app-agree-list',
  imports: [NgForOf,
    NgbPagination,
    RouterLink,
    NgIf],
  templateUrl: './agree-list.component.html'
})
export class AgreeListComponent implements OnInit {
  public agrees: Agree[] = [];
    public pageSize = 5;
    public page = 1;
    public totalAgrees = 0;
  
    constructor(
      public router: Router,
      private agreeService: AgreeService) {
    }
  
    ngOnInit(): void {
      this.agreeService.getPage({ pageParams:  { size: this.pageSize }, sort: { username: 'ASC' } }).subscribe(
        (page: PagedResourceCollection<Agree>) => {
          console.log("Agrees loaded:", page.resources); // <-- Verifica el contenido aquí
          this.agrees = page.resources;
          
          for (const agree of this.agrees) {
            const href = (agree as any)._links?.self?.href;
            const idStr = href?.split('/').pop();
            agree.id = Number(idStr);
  
            agree.getRelation<User>('user').subscribe(user => agree.user = user);
            //agree.getRelation<any>('what').subscribe(what => agree.what = what);
          }
          this.totalAgrees = page.totalElements;
        });
    }
  
    changePage(): void {
      this.agreeService.getPage({ pageParams: { page: this.page - 1, size: this.pageSize }, sort: { username: 'ASC' } }).subscribe(
        (page: PagedResourceCollection<Agree>) => this.agrees = page.resources);
  
      for (const agree of this.agrees) {
        const href = (agree as any)._links?.self?.href;
        const idStr = href?.split('/').pop();
        agree.id = Number(idStr);
  
        agree.getRelation<User>('user').subscribe(user => agree.user = user);
        //agree.getRelation<any>('what').subscribe(what => agree.what = what);
      }
    }
}
