import {
  AfterContentChecked,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Course } from './models/course.model';
import { CoursesService } from './courses.service';
import { Observable, map } from 'rxjs';
import { CoursesFormComponent } from './components/courses-form/courses-form.component';
import { MatDialog } from '@angular/material/dialog';
import { Role } from '../users/models/user.models';
import { Store } from '@ngrx/store';
import { selectAuthUser } from 'src/app/store/auth/auth.selectors';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements AfterContentChecked {
  courses = new MatTableDataSource<Course>();
  courses$: Observable<MatTableDataSource<Course>>;
  userRole$: Observable<Role | undefined>;
  userRoleDefault: Role = Role.USER;

  constructor(
    private coursesService: CoursesService,
    private matDialog: MatDialog,
    private changeDetector: ChangeDetectorRef,
    private store: Store
  ) {
    this.userRole$ = this.store
      .select(selectAuthUser)
      .pipe(map((u) => u?.role));

    this.courses$ = this.coursesService.getCourses$().pipe(
      map((data) => {
        this.courses.data = data;
        return this.courses;
      })
    );
  }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
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
              })
              .pipe(
                map((data: Course[]) => {
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
