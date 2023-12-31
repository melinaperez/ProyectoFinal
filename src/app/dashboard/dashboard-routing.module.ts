import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { adminGuard } from '../core/guard/adminRole.guard';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '', // /dashboard,
        component: DashboardComponent,
        children: [
          {
            path: 'home', // /dashboard/home
            component: HomeComponent,
          },

          {
            path: 'courses',
            loadChildren: () =>
              import('./pages/courses/courses.module').then(
                (m) => m.CoursesModule
              ),
          },
          {
            path: 'enrollments',
            loadChildren: () =>
              import('./pages/enrollments/enrollments.module').then(
                (m) => m.EnrollmentsModule
              ),
          },
          {
            path: 'students',
            loadChildren: () =>
              import('./pages/students/students.module').then(
                (m) => m.StudentsModule
              ),
          },
          {
            path: 'teachers',
            loadChildren: () =>
              import('./pages/teachers/teachers.module').then(
                (m) => m.TeachersModule
              ),
          },
          {
            path: 'users',
            canActivate: [adminGuard],
            loadChildren: () =>
              import('./pages/users/users.module').then((m) => m.UsersModule),
          },
          {
            path: 'access-denied',
            loadChildren: () =>
              import('./pages/access-denied/access-denied.module').then(
                (m) => m.AccessDeniedModule
              ),
          },
          {
            path: '**',
            redirectTo: 'home',
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
