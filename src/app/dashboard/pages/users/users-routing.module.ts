import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UsersComponent } from './users.component';
import { UsersDetailsComponent } from './components/users-details/users-details.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: UsersComponent,
      },
      {
        path: ':id',
        component: UsersDetailsComponent,
      },
    ]),
  ],
  exports: [RouterModule],
  declarations: [],
  providers: [],
})
export class UsersRoutingModule {}
