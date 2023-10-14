import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsFormComponent } from './components/students-form/students-form.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { StudentsListComponent } from './components/students-list/students-list.component';
import { StudentsComponent } from './students.component';

@NgModule({
  declarations: [
    StudentsFormComponent,
    StudentsListComponent,
    StudentsComponent,
  ],
  imports: [CommonModule, SharedModule],
  exports: [StudentsComponent],
})
export class StudentsModule {}
