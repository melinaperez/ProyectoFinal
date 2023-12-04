import { ChangeDetectorRef, Component } from '@angular/core';
import { Enrollment } from '../../models';
import { ActivatedRoute } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { EnrollmentActions } from '../../store/enrollment.actions';
import { selectDetail } from '../../store/enrollment.selectors';
import { Role } from '../../../users/models/user.models';
import { selectAuthUser } from 'src/app/store/auth/auth.selectors';

@Component({
  selector: 'app-enrollments-details',
  templateUrl: './enrollments-details.component.html',
  styleUrls: ['./enrollments-details.component.scss'],
})
export class EnrollmentsDetailsComponent {
  enrollment: Enrollment | undefined;
  enrollment$: Observable<Enrollment | undefined>;
  id: number;
  userRole$: Observable<Role | undefined>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store,
    private cdr: ChangeDetectorRef
  ) {
    this.userRole$ = this.store
      .select(selectAuthUser)
      .pipe(map((u) => u?.role));

    this.id = parseInt(this.activatedRoute.snapshot.params['id']);
    this.store.dispatch(
      EnrollmentActions.detailEnronllment({ idEnrollment: this.id })
    );

    this.enrollment$ = this.store.select(selectDetail).pipe(
      tap((data) => {
        this.enrollment = data;
      })
    );
  }

  deleteEnrollment(enrollmentId: number): void {
    if (confirm('¿Está seguro de eliminar el curso?')) {
      this.store.dispatch(
        EnrollmentActions.deleteEnrollment({ idEnrollment: enrollmentId })
      );
      window.history.back();
    }
  }
}
