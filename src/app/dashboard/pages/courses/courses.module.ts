import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses.component';
import { CoursesListComponent } from './components/courses-list/courses-list.component';
import { CoursesFormComponent } from './components/courses-form/courses-form.component';
import { CoursesDetailsComponent } from './components/courses-details/courses-details.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { CourseRoutingModule } from './courses-routing.module';

@NgModule({
  declarations: [
    CoursesComponent,
    CoursesListComponent,
    CoursesFormComponent,
    CoursesDetailsComponent,
  ],
  imports: [CommonModule, SharedModule, CourseRoutingModule],
  exports: [CoursesComponent],
})
export class CoursesModule {}
