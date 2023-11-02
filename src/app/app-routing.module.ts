import { NgModule } from '@angular/core';
import { AuthComponent } from './auth/auth.component';
import { EnrollmentsComponent } from './dashboard/pages/enrollments/enrollments.component';
import { CoursesDetailsComponent } from './dashboard/pages/courses/components/courses-details/courses-details.component';
import { UsersComponent } from './dashboard/pages/users/users.component';
import { UsersDetailsComponent } from './dashboard/pages/users/components/users-details/users-details.component';
import { TeachersComponent } from './dashboard/pages/teachers/teachers.component';
import { TeachersDetailsComponent } from './dashboard/pages/teachers/components/teachers-details/teachers-details.component';
import { RouterModule, Routes } from '@angular/router';
import { dashboardGuard } from './core/guard/dashboard.guard';

const routes: Routes = [
  {
    path: 'dashboard',
    canActivate: [dashboardGuard],
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
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
