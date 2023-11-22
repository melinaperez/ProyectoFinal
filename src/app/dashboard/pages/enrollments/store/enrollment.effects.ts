import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, tap } from 'rxjs/operators';
import { Observable, EMPTY, of, forkJoin } from 'rxjs';
import { EnrollmentActions } from './enrollment.actions';
import { HttpClient } from '@angular/common/http';
import { CreateEnrollmentPayload, Enrollment } from '../models';
import { environment } from 'src/environments/environment.local';
import { Course } from '../../courses/models/course.model';
import { Student } from '../../students/models';

@Injectable()
export class EnrollmentEffects {
  loadEnrollments$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EnrollmentActions.loadEnrollments),
      concatMap(() =>
        this.getEnrollmentsComplete().pipe(
          map((data) => EnrollmentActions.loadEnrollmentsSuccess({ data })),
          catchError((error) =>
            of(EnrollmentActions.loadEnrollmentsFailure({ error }))
          )
        )
      )
    );
  });

  loadEnrollmentOptions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EnrollmentActions.loadEnrollmentOptions),
      concatMap(() =>
        this.getEnrollmentOptions().pipe(
          map((resp) => EnrollmentActions.loadEnrollmentOptionsSuccess(resp)),
          catchError((err) =>
            of(
              EnrollmentActions.loadEnrollmentOptionsFailure({
                error: err,
              })
            )
          )
        )
      )
    )
  );

  createEnrollment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EnrollmentActions.createEnrollment),
      concatMap((action) => {
        return this.createEnrollment(action.payload).pipe(
          map((data) => EnrollmentActions.loadEnrollments()),
          catchError((error) =>
            of(EnrollmentActions.createEnrollmentFailure({ error }))
          )
        );
      })
    )
  );

  deleteEnrollment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EnrollmentActions.deleteEnrollment),
      concatMap((action) => {
        return this.deleteEnrollment(action.idEnrollment).pipe(
          map((data) => EnrollmentActions.loadEnrollments()),
          catchError((error) =>
            of(EnrollmentActions.deleteEnrollmentFailure({ error }))
          )
        );
      })
    )
  );

  constructor(private actions$: Actions, private httpClient: HttpClient) {}

  createEnrollment(payload: CreateEnrollmentPayload): Observable<Enrollment> {
    return this.httpClient.post<Enrollment>(
      `${environment.baseUrl}/enrollments`,
      payload
    );
  }

  deleteEnrollment(idEnrollment: number): Observable<any> {
    return this.httpClient.delete(
      `${environment.baseUrl}/enrollments/${idEnrollment}`
    );
  }

  getEnrollmentsComplete(): Observable<Enrollment[]> {
    return this.httpClient.get<Enrollment[]>(
      `${environment.baseUrl}/enrollments?_expand=course&_expand=student`
    );
  }

  getEnrollmentOptions(): Observable<{
    courses: Course[];
    students: Student[];
  }> {
    return forkJoin([
      this.httpClient.get<Course[]>(`${environment.baseUrl}/courses`),
      this.httpClient.get<Student[]>(`${environment.baseUrl}/students`),
    ]).pipe(
      map(([courses, students]) => {
        return {
          courses,
          students,
        };
      })
    );
  }
}
