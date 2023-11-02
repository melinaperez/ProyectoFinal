import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'formErrors',
})
export class FormErrorsPipe implements PipeTransform {
  transform(
    value: ValidationErrors | null | undefined,
    ...args: unknown[]
  ): unknown {
    if (!value) return '';

    const errorMessages: string[] = [];

    if (value) {
      if ('required' in value) {
        errorMessages.push('Este campo es requerido');
      }

      if ('email' in value) {
        errorMessages.push('Debe ser un correo válido');
      }

      if ('minlength' in value) {
        errorMessages.push(
          'El largo mínimo es ' + value['minlength'].requiredLength
        );
      }

      if ('maxlength' in value) {
        errorMessages.push(
          'El largo máximo es ' + value['maxlength'].requiredLength
        );
      }

      if ('pattern' in value) {
        let pattern = [value['pattern']['requiredPattern']];
        if (pattern[0].includes('http'))
          errorMessages.push('Ingrese una URL válida');
        else if (pattern[0].includes('^[0-9]+$'))
          errorMessages.push('Sólo se aceptan números');
      }

      if ('minDate' in value) {
        errorMessages.push('La fecha debe ser menor a hoy');
      }
    }

    return errorMessages.join('. ');
  }
}
