import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, tap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { EnrollmentActions } from './enrollment.actions';
import { HttpClient } from '@angular/common/http';
import { Enrollment } from '../models';
import { environment } from 'src/environments/environment.local';

@Injectable()
export class EnrollmentEffects {
  loadEnrollments$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EnrollmentActions.loadEnrollments),
      concatMap(() =>
        this.getEnrollments().pipe(
          map((data) => EnrollmentActions.loadEnrollmentsSuccess({ data })),
          catchError((error) =>
            of(EnrollmentActions.loadEnrollmentsFailure({ error }))
          )
        )
      )
    );
  });

  constructor(private actions$: Actions, private httpClient: HttpClient) {}

  getEnrollments(): Observable<Enrollment[]> {
    return this.httpClient.get<Enrollment[]>(
      `${environment.baseUrl}/enrollments?_expand=course&_expand=student`
    );
  }
}
