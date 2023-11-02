import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeachersComponent } from './teachers.component';
import { TeachersListComponent } from './components/teachers-list/teachers-list.component';
import { TeachersFormComponent } from './components/teachers-form/teachers-form.component';
import { TeachersDetailsComponent } from './components/teachers-details/teachers-details.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { TeachersRoutingModule } from './teachers-routing.module';

@NgModule({
  declarations: [
    TeachersComponent,
    TeachersListComponent,
    TeachersFormComponent,
    TeachersDetailsComponent,
  ],
  imports: [CommonModule, SharedModule, TeachersRoutingModule],
  exports: [TeachersComponent],
})
export class TeachersModule {}
