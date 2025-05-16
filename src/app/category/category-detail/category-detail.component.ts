import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import { Category } from "../category";
import { CategoryService } from "../category.service";


@Component({
  selector: 'app-category-detail',
  imports: [
    RouterLink
  ],
  templateUrl: './category-detail.component.html'
})
export class CategoryDetailComponent implements OnInit {

  public category: Category = new Category();

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService
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


}
