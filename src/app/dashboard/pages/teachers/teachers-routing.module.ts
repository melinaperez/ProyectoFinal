import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TeachersComponent } from './teachers.component';
import { TeachersDetailsComponent } from './components/teachers-details/teachers-details.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: TeachersComponent,
      },
      {
        path: ':id',
        component: TeachersDetailsComponent,
      },
    ]),
  ],
  exports: [RouterModule],
  declarations: [],
  providers: [],
})
export class TeachersRoutingModule {}
