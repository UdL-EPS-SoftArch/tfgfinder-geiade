import { Injectable } from '@angular/core';
import { HateoasResourceOperation } from '@lagoshny/ngx-hateoas-client';
import { Student } from './student';

@Injectable({ providedIn: 'root' })
export class StudentService extends HateoasResourceOperation<Student> {
  constructor() {
    super(Student);
  }
}
