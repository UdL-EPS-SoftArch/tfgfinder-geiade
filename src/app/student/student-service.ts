import { Injectable } from '@angular/core';
import { Student } from './student';
import { HateoasResourceOperation } from '@lagoshny/ngx-hateoas-client';

@Injectable({ providedIn: 'root' })
export class StudentService extends HateoasResourceOperation<Student> {
  constructor() {
    super(Student);
  }
}
