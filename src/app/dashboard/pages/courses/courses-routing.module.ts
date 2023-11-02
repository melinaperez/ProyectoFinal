import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CoursesComponent } from './courses.component';
import { CoursesDetailsComponent } from './components/courses-details/courses-details.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: CoursesComponent,
      },
      {
        path: ':id',
        component: CoursesDetailsComponent,
      },
    ]),
  ],
  exports: [RouterModule],
  declarations: [],
  providers: [],
})
export class CourseRoutingModule {}
