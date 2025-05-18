import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {Category} from "../category";
import {CategoryService} from "../category.service";

@Component({
  selector: 'app-category-edit',
  imports: [RouterLink, FormsModule],
  templateUrl: './category-edit.component.html'
})
export class CategoryEditComponent implements OnInit {
  public category: Category = new Category();

  constructor(private route: ActivatedRoute,
              private router: Router,
              private categoryService: CategoryService) {
  }

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

  onSubmit(): void {
    this.categoryService.patchResource(this.category).subscribe(
      (updatedCategory: Category) => {
        this.router.navigate(['/categories', updatedCategory.name]);
      },
      error => {
        console.error('Error updating category', error);
      }
    );
  }

}
