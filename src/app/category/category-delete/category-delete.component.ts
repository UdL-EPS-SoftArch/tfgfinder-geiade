import {Component, OnInit} from '@angular/core';
import {Category} from "../category";
import {ActivatedRoute, Router} from "@angular/router";
import {CategoryService} from "../category.service";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-category-delete',
  imports: [ RouterModule],
  templateUrl: './category-delete.component.html'
})
export class CategoryDeleteComponent implements OnInit {
  public category: Category = new Category();


  constructor(private route: ActivatedRoute,
              private router: Router,
              private categoryService: CategoryService
  ) {  }

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

  delete(): void {
    this.categoryService.deleteResource(this.category).subscribe(
      () => {

        this.router.navigate(['/categories']);
      });
  }

}
