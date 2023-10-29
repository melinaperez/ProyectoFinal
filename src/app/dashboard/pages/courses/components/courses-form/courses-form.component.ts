import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-courses-form',
  templateUrl: './courses-form.component.html',
  styleUrls: ['./courses-form.component.scss'],
})
export class CoursesFormComponent {
  courseForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private matDialogRef: MatDialogRef<CoursesFormComponent>,
    @Inject(MAT_DIALOG_DATA) public course?: Course
  ) {
    this.courseForm = this.formBuilder.group({
      id: [],
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ],
      ],
      duration: ['', [Validators.required, Validators.pattern('^[0-9]+')]],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
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
