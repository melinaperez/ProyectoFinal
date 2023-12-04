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
        console.log('Dataaa1', data.length);
        this.enrollments.data = data;
        return this.enrollments;
      })
    );
  }

  //Esto lo agrego porque al eliminar un elemento me estaba dando un error la tabla (ExpressionChangedAfterItHasBeenCheckedError)
  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }

  addEnrollment(): void {
    this.matDialog.open(EnrollmentsFormComponent);
  }

  deleteEnrollment(enrollmentId: number): void {
    if (confirm('¿Está seguro de eliminar el curso?'))
      this.store.dispatch(
        EnrollmentActions.deleteEnrollment({ idEnrollment: enrollmentId })
      );
  }
}
