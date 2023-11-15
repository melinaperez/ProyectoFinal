import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnrollmentsComponent } from './enrollments.component';
import { EnrollmentsRoutingModule } from './enrollments-routing.module';
import { EnrollmentsDetailsComponent } from './components/enrollments-details/enrollments-details.component';
import { EnrollmentsFormComponent } from './components/enrollments-form/enrollments-form.component';
import { EnrollmentsListComponent } from './components/enrollments-list/enrollments-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { enrollmentFeature } from './store/enrollment.reducer';
import { EnrollmentEffects } from './store/enrollment.effects';

@NgModule({
  declarations: [
    EnrollmentsComponent,
    EnrollmentsDetailsComponent,
    EnrollmentsFormComponent,
    EnrollmentsListComponent,
  ],
  imports: [
    CommonModule,
    EnrollmentsRoutingModule,
    SharedModule,
    StoreModule.forFeature(enrollmentFeature),
    EffectsModule.forFeature([EnrollmentEffects]),
  ],
  exports: [EnrollmentsComponent],
})
export class EnrollmentsModule {}
