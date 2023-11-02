import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnrollmentsComponent } from './enrollments.component';
import { EnrollmentsRoutingModule } from './enrollments-routing.module';

@NgModule({
  declarations: [EnrollmentsComponent],
  imports: [CommonModule, EnrollmentsRoutingModule],
})
export class EnrollmentsModule {}
