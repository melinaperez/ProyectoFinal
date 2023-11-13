import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Course } from '../../models/course.model';
import { Teacher } from '../../../teachers/models/teacher.model';
import { TeachersService } from '../../../teachers/services/teachers.service';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-courses-form',
  templateUrl: './courses-form.component.html',
  styleUrls: ['./courses-form.component.scss'],
})
export class CoursesFormComponent {
  courseForm: FormGroup;
  teachers: Teacher[] = [];
  teachers$: Observable<Teacher[]>;

  constructor(
    private formBuilder: FormBuilder,
    private matDialogRef: MatDialogRef<CoursesFormComponent>,
    private teachersService: TeachersService,
    @Inject(MAT_DIALOG_DATA) public course?: Course
  ) {
    this.teachers$ = this.teachersService.getTeachers$().pipe(
      map((data) => {
        this.teachers = data;
        return this.teachers;
      })
    );
    this.courseForm = this.formBuilder.group({
      id: [],
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(1000),
        ],
      ],
      duration: ['', [Validators.required, Validators.pattern('^[0-9]+')]],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      teacher: ['', Validators.required],
    });

    if (this.course) {
      this.courseForm.patchValue(this.course);
    }
  }

  onSubmit(): void {
    if (this.courseForm.invalid) {
      this.courseForm.markAllAsTouched();
    } else {
      this.matDialogRef.close(this.courseForm.value);
    }
  }
}
