import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Course } from './models/course.model';
import { CoursesService } from './courses.service';
import { Observable, map } from 'rxjs';
import { CoursesFormComponent } from './components/courses-form/courses-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent {
  courses = new MatTableDataSource<Course>();
  courses$: Observable<MatTableDataSource<Course>>;

  constructor(
    private coursesService: CoursesService,
    private matDialog: MatDialog
  ) {
    this.courses$ = this.coursesService.getCourses$().pipe(
      map((data) => {
        this.courses.data = data;
        return this.courses;
      })
    );
  }

  openCourseDialog(): void {
    this.matDialog
      .open(CoursesFormComponent)
      .afterClosed()
      .subscribe({
        next: (v) => {
          if (!!v) {
            this.courses$ = this.coursesService
              .createCourse$({
                ...v,
                id: this.courses.data.length + 1,
              })
              .pipe(
                map((data) => {
                  this.courses.data = data;
                  return this.courses;
                })
              );
          }
        },
      });
  }

  onEditCourse(course: Course): void {
    this.matDialog
      .open(CoursesFormComponent, {
        data: course,
      })
      .afterClosed()
      .subscribe({
        next: (v) => {
          if (!!v) {
            this.courses$ = this.coursesService.editCourse$(course.id, v).pipe(
              map((data) => {
                this.courses.data = data;
                return this.courses;
              })
            );
          }
        },
      });
  }

  onDeleteCourse(courseId: number): void {
    if (confirm('¿Está seguro de eliminar el curso?'))
      this.courses$ = this.coursesService.deleteCourse$(courseId).pipe(
        map((data) => {
          this.courses.data = data;
          return this.courses;
        })
      );
  }
}
