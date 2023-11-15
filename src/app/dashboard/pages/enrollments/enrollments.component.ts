import {
  AfterContentChecked,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { Enrollment } from './models';
import { Observable, map } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { EnrollmentsFormComponent } from './components/enrollments-form/enrollments-form.component';
import { Store } from '@ngrx/store';
import { selectEnrollments } from './store/enrollment.selectors';
import { EnrollmentActions } from './store/enrollment.actions';

@Component({
  selector: 'app-enrollments',
  templateUrl: './enrollments.component.html',
  styleUrls: ['./enrollments.component.scss'],
})
export class EnrollmentsComponent implements AfterContentChecked {
  enrollments = new MatTableDataSource<Enrollment>();
  enrollments$: Observable<MatTableDataSource<Enrollment>>;

  constructor(
    private store: Store,
    private matDialog: MatDialog,
    private changeDetector: ChangeDetectorRef
  ) {
    this.store.dispatch(EnrollmentActions.loadEnrollments());
    this.enrollments$ = this.store.select(selectEnrollments).pipe(
      map((data) => {
        this.enrollments.data = data;
        return this.enrollments;
      })
    );
  }

  //Esto lo agrego porque al eliminar un elemento me estaba dando un error la tabla (ExpressionChangedAfterItHasBeenCheckedError)
  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }

  // openEnrollmentDialog(): void {
  //   this.matDialog
  //     .open(EnrollmentsFormComponent)
  //     .afterClosed()
  //     .subscribe({
  //       next: (v) => {
  //         if (!!v) {
  //           this.enrollments$ = this.enrollmentsService
  //             .createEnrollment$({
  //               ...v,
  //             })
  //             .pipe(
  //               map((data: Enrollment[]) => {
  //                 this.enrollments.data = data;
  //                 return this.enrollments;
  //               })
  //             );
  //         }
  //       },
  //     });
  // }

  // onEditEnrollment(enrollment: Enrollment): void {
  //   this.matDialog
  //     .open(EnrollmentsFormComponent, {
  //       data: enrollment,
  //     })
  //     .afterClosed()
  //     .subscribe({
  //       next: (v) => {
  //         if (!!v) {
  //           this.enrollments$ = this.enrollmentsService
  //             .editEnrollment$(enrollment.id, v)
  //             .pipe(
  //               map((data) => {
  //                 this.enrollments.data = data;
  //                 return this.enrollments;
  //               })
  //             );
  //         }
  //       },
  //     });
  // }

  // onDeleteEnrollment(enrollmentId: number): void {
  //   if (confirm('¿Está seguro de eliminar al alumno?'))
  //     this.enrollments$ = this.enrollmentsService
  //       .deleteEnrollment$(enrollmentId)
  //       .pipe(
  //         map(() => {
  //           this.enrollments.data = this.enrollments.data.filter(
  //             (enrollment) => enrollment.id !== enrollmentId
  //           );
  //           return this.enrollments;
  //         })
  //       );
  // }
}
