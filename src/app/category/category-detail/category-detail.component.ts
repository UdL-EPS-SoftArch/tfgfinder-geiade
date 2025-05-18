import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import { Category } from '../category';
import { CategoryService } from '../category.service';
import {AuthenticationBasicService} from "../../login-basic/authentication-basic.service";
import {NgIf} from "@angular/common";


@Component({
  selector: 'app-category-detail',
  imports: [
    RouterLink,
    NgIf
  ],
  templateUrl: './category-detail.component.html'
})
export class CategoryDetailComponent implements OnInit {

  public category: Category = new Category();

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private authService: AuthenticationBasicService
  ) {}

  ngOnInit(): void {
    const name = this.route.snapshot.paramMap.get('name');
    if (name) {
      this.categoryService.findByName(name).subscribe(
        (category: Category) => {
          this.category = category;
        },
        error => {
          console.error('Error loading category', error);
        }
      );
    }
  }
  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

}
