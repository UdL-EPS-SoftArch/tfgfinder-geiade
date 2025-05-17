import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";

import {ActivatedRoute, Router} from '@angular/router';
import { Location } from '@angular/common';
import {Category} from "../category";
import {CategoryService} from "../category.service";

@Component({
  selector: 'app-category-register',
  imports: [FormsModule],
  templateUrl: './category-register.component.html'
})
export class CategoryRegisterComponent implements OnInit {
  public category: Category = new Category();

  constructor(
    private router: Router,
    private location: Location,
    private route: ActivatedRoute,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    const name = this.route.snapshot.paramMap.get('name');
    if (name) {
      this.categoryService.findByName(name).subscribe(
        (category: Category) => this.category = category,
        error => console.error('Error loading category', error)
      );
    }
  }

  onSubmit(): void {
    this.categoryService.createResource({ body: this.category }).subscribe(
      () => this.router.navigate(['/categories']),
      error => console.error('Error creating category', error)
    );
  }


  onCancel(): void {
    this.location.back();
  }
}
