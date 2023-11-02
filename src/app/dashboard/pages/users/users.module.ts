import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { UsersDetailsComponent } from './components/users-details/users-details.component';
import { UsersFormComponent } from './components/users-form/users-form.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { UsersRoutingModule } from './users-routing.module';

@NgModule({
  declarations: [
    UsersComponent,
    UsersDetailsComponent,
    UsersFormComponent,
    UsersListComponent,
  ],
  imports: [CommonModule, SharedModule, UsersRoutingModule],
  exports: [UsersComponent],
})
export class UsersModule {}
