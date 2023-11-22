import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromEnrollment from './enrollment.reducer';

export const selectEnrollmentState =
  createFeatureSelector<fromEnrollment.State>(
    fromEnrollment.enrollmentFeatureKey
  );

export const selectEnrollments = createSelector(
  selectEnrollmentState,
  (state) => state.enrollments
);
export const selectEnrollmentsIsLoading = createSelector(
  selectEnrollmentState,
  (state) => state.isLoading
);

export const selectCourseOptions = createSelector(
  selectEnrollmentState,
  (state) => state.courseOptions
);

export const selectStudentOptions = createSelector(
  selectEnrollmentState,
  (state) => state.studentOptions
);

export const selectIsLoadingOptions = createSelector(
  selectEnrollmentState,
  (state) => state.isLoadingOptions
);
