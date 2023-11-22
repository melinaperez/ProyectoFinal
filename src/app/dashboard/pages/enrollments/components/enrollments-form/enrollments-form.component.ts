import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { CreateEnrollmentPayload, Enrollment } from '../../models';
import { Observable, map, startWith, switchMap, take } from 'rxjs';
import { Course } from '../../../courses/models/course.model';
import { User } from '../../../users/models/user.models';
import { EnrollmentActions } from '../../store/enrollment.actions';
import {
  selectCourseOptions,
  selectIsLoadingOptions,
  selectStudentOptions,
} from '../../store/enrollment.selectors';
import { Student } from '../../../students/models';

@Component({
  selector: 'app-enrollments-form',
  templateUrl: './enrollments-form.component.html',
  styleUrls: ['./enrollments-form.component.scss'],
})
export class EnrollmentsFormComponent {
  enrollmentForm: FormGroup;
  courseOptions$: Observable<Course[]>;
  studentOptions$: Observable<Student[]>;
  isLoading$: Observable<boolean>;
  filteredCourses: Observable<Course[]>;
  filteredStudents: Observable<Student[]>;

  _coursesFilter(
    options: Course[],
    value: { id: number; name: string }
  ): Course[] {
    if (value && value.name) {
      const filterValue = value.name.toLowerCase();
      return options.filter((item) =>
        (item.name || '').toLowerCase().includes(filterValue)
      );
    }
    return options;
  }

  _studentsFilter(
    options: Student[],
    value: { id: string; name: string; lastname: string }
  ): Student[] {
    if (value && value.name && value.lastname) {
      const filterValue = value.name.toLowerCase();
      return options.filter((item) => {
        (item.name || '').toLowerCase().includes(filterValue) ||
          (item.lastname || '').toLowerCase().includes(filterValue);
      });
    }
    return options;
  }

  constructor(
    private formBuilder: FormBuilder,
    private matDialogRef: MatDialogRef<EnrollmentsFormComponent>,
    private store: Store,
    private action$: Actions,
    @Inject(MAT_DIALOG_DATA) public enrollment?: Enrollment
  ) {
    this.enrollmentForm = this.formBuilder.group({
      courseId: [null],
      studentId: [null],
      inscriptionDate: [new Date()],
    });
    this.store.dispatch(EnrollmentActions.loadEnrollmentOptions());
    this.isLoading$ = this.store.select(selectIsLoadingOptions);
    this.courseOptions$ = this.store.select(selectCourseOptions);
    this.studentOptions$ = this.store.select(selectStudentOptions);

    this.filteredCourses = this.enrollmentForm
      .get('courseId')!
      .valueChanges.pipe(
        startWith(''),
        switchMap((value) =>
          this.courseOptions$.pipe(
            map((options) => this._coursesFilter(options, value))
          )
        )
      );

    this.filteredStudents = this.enrollmentForm
      .get('studentId')!
      .valueChanges.pipe(
        startWith(''),
        switchMap((value) =>
          this.studentOptions$.pipe(
            map((options) => this._studentsFilter(options, value))
          )
        )
      );

    this.action$
      .pipe(ofType(EnrollmentActions.loadEnrollments), take(1))
      .subscribe({
        next: () => this.matDialogRef.close(),
      });
  }

  onSubmit(): void {
    let courseId = this.enrollmentForm.value['courseId']['id'];
    let studentId = this.enrollmentForm.value['studentId']['id'];

    let payload: CreateEnrollmentPayload = {
      courseId: courseId,
      studentId: studentId,
      inscriptionDate: new Date(),
    };

    this.store.dispatch(
      EnrollmentActions.createEnrollment({
        payload,
      })
    );
  }

  displayCourseFn(course: Course): string {
    return course ? course.name : '';
  }

  displayStudentFn(student: Student): string {
    return student ? `${student.name} ${student.lastname}` : '';
  }
}
