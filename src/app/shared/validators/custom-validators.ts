import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';

export function minDate(
  control: AbstractControl
): Observable<ValidationErrors | null> {
  if (control.value > new Date()) {
    return of({
      minDate: true,
    });
  }
  return of(null);
}
