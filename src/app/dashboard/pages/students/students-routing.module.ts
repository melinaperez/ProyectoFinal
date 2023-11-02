import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StudentsComponent } from './students.component';
import { StudentsDetailsComponent } from './components/students-details/students-details.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: StudentsComponent,
      },
      {
        path: ':id',
        component: StudentsDetailsComponent,
      },
    ]),
  ],
  exports: [RouterModule],
  declarations: [],
  providers: [],
})
export class StudentsRoutingModule {}
