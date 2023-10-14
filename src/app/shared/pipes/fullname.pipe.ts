import { Pipe, PipeTransform } from '@angular/core';
import { Student } from 'src/app/dashboard/pages/students/models';

@Pipe({
  name: 'fullname',
})
export class FullnamePipe implements PipeTransform {
  transform(value: Student, ...args: unknown[]): unknown {
    return `${value.name} ${value.lastname}`;
  }
}
