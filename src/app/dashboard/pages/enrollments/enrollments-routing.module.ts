import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EnrollmentsComponent } from './enrollments.component';
import { EnrollmentsDetailsComponent } from './components/enrollments-details/enrollments-details.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: EnrollmentsComponent,
      },
      {
        path: ':id',
        component: EnrollmentsDetailsComponent,
      },
    ]),
  ],
  exports: [RouterModule],
  declarations: [],
  providers: [],
})
export class EnrollmentsRoutingModule {}
