import { createFeature, createReducer, on } from '@ngrx/store';
import { EnrollmentActions } from './enrollment.actions';
import { Enrollment } from '../models';
import { Course } from '../../courses/models/course.model';
import { Student } from '../../students/models';

export const enrollmentFeatureKey = 'enrollment';

export interface State {
  isLoading: boolean;
  isLoadingOptions: boolean;
  courseOptions: Course[];
  studentOptions: Student[];
  enrollments: Enrollment[];
  error: unknown;
}

export const initialState: State = {
  isLoading: false,
  isLoadingOptions: false,
  enrollments: [],
  courseOptions: [],
  studentOptions: [],
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(EnrollmentActions.loadEnrollments, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(EnrollmentActions.loadEnrollmentsSuccess, (state, { data }) => ({
    ...state,
    isLoading: false,
    enrollments: data,
  })),
  on(EnrollmentActions.loadEnrollmentsFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),
  on(EnrollmentActions.loadEnrollmentOptions, (state) => {
    return {
      ...state,
      isLoadingDialogOptions: true,
    };
  }),
  on(EnrollmentActions.loadEnrollmentOptionsSuccess, (state, action) => ({
    ...state,
    courseOptions: action.courses,
    studentOptions: action.students,
    isLoadingDialogOptions: false,
  })),

  on(EnrollmentActions.loadEnrollmentOptionsFailure, (state, action) => ({
    ...state,
    error: action.error,
    isLoadingDialogOptions: false,
  })),

  on(EnrollmentActions.deleteEnrollment, (state, action) => ({
    ...state,
    isLoading: false,
  })),

  on(EnrollmentActions.deleteEnrollmentFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  }))
);

export const enrollmentFeature = createFeature({
  name: enrollmentFeatureKey,
  reducer,
});
