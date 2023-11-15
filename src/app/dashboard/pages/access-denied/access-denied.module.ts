import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccessDeniedComponent } from './access-denied.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AccessDeniedRoutingModule } from './access-denied-routing.module';

@NgModule({
  declarations: [AccessDeniedComponent],
  imports: [CommonModule, SharedModule, AccessDeniedRoutingModule],
})
export class AccessDeniedModule {}
