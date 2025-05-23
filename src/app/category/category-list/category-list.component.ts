import { Component, OnInit } from '@angular/core';
import { Category } from "../category";
import { CategoryService } from "../category.service";
import { PagedResourceCollection} from "@lagoshny/ngx-hateoas-client";
import {NgbPagination} from "@ng-bootstrap/ng-bootstrap";
import {NgForOf, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {AuthenticationBasicService} from "../../login-basic/authentication-basic.service";


@Component({
  selector: 'app-category-list',
  imports: [
    NgbPagination, NgForOf, RouterLink, NgIf
  ],
  templateUrl: './category-list.component.html'
})
export class CategoryListComponent implements OnInit {
  public categories: Category[] = [];
  public pageSize = 5;
  public page = 1;
  public totalcategories = 0;

  constructor(
    private categoryService: CategoryService,
    private authService: AuthenticationBasicService) {
  }

  ngOnInit(): void {
    this.categoryService.getPage({ pageParams:  { size: this.pageSize } }).subscribe(
      (page: PagedResourceCollection<Category>) => {
        this.categories = page.resources;
        this.totalcategories = page.totalElements;
      });
  }

  changePage(): void {
    this.categoryService.getPage({ pageParams: { page: this.page - 1, size: this.pageSize }}).subscribe(
      (page: PagedResourceCollection<Category>) => this.categories = page.resources);
  }

  detail(event: any): void {
    this.categories = event.result.category;
    this.totalcategories = event.result.totalElements;
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}




