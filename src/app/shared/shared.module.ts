import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { FullnamePipe } from './pipes/fullname.pipe';
import { FormErrorsPipe } from './pipes/form-errors.pipe';
import { HeadlineDirective } from './directives/headline.directive';

@NgModule({
  declarations: [FullnamePipe, FormErrorsPipe, HeadlineDirective],
  imports: [CommonModule],
  exports: [
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatListModule,
    MatSelectModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatTabsModule,
    ReactiveFormsModule,
    FullnamePipe,
    FormErrorsPipe,
    HeadlineDirective,
  ],
})
export class SharedModule {}
