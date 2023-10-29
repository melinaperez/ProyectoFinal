import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './dashboard/pages/home/home.component';
import { CoursesComponent } from './dashboard/pages/courses/courses.component';
import { StudentsComponent } from './dashboard/pages/students/students.component';
import { StudentsDetailsComponent } from './dashboard/pages/students/components/students-details/students-details.component';
import { AuthComponent } from './auth/auth/auth.component';
import { EnrollmentsComponent } from './dashboard/pages/enrollments/enrollments.component';
import { CoursesDetailsComponent } from './dashboard/pages/courses/components/courses-details/courses-details.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'courses',
        component: CoursesComponent,
      },
      {
        path: 'courses/:id',
        component: CoursesDetailsComponent,
      },
      {
        path: 'students',
        component: StudentsComponent,
      },
      {
        path: 'students/:id',
        component: StudentsDetailsComponent,
      },
      {
        path: 'enrollments',
        component: EnrollmentsComponent,
      },
      {
        path: '**',
        redirectTo: 'home',
      },
    ],
  },
  {
    path: 'auth',
    component: AuthComponent,
  },
  {
    path: '**',
    redirectTo: 'auth',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
