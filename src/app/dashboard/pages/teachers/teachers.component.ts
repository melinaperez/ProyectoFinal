import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Teacher } from './models/teacher.model';
import { Observable, map } from 'rxjs';
import { TeachersService } from './services/teachers.service';
import { MatDialog } from '@angular/material/dialog';
import { TeachersFormComponent } from './components/teachers-form/teachers-form.component';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.scss'],
})
export class TeachersComponent {
  teachers = new MatTableDataSource<Teacher>();
  teachers$: Observable<MatTableDataSource<Teacher>>;

  constructor(
    private teachersService: TeachersService,
    private matDialog: MatDialog
  ) {
    this.teachers$ = this.teachersService.getTeachers$().pipe(
      map((data) => {
        this.teachers.data = data;
        return this.teachers;
      })
    );
  }

  openTeacherDialog(): void {
    this.matDialog
      .open(TeachersFormComponent)
      .afterClosed()
      .subscribe({
        next: (v) => {
          if (!!v) {
            this.teachers$ = this.teachersService
              .createTeacher$({
                ...v,
                id: this.teachers.data.length + 1,
              })
              .pipe(
                map((data) => {
                  this.teachers.data = data;
                  return this.teachers;
                })
              );
          }
        },
      });
  }

  onEditTeacher(teacher: Teacher): void {
    this.matDialog
      .open(TeachersFormComponent, {
        data: teacher,
      })
      .afterClosed()
      .subscribe({
        next: (v) => {
          if (!!v) {
            this.teachers$ = this.teachersService
              .editTeacher$(teacher.id, v)
              .pipe(
                map((data) => {
                  this.teachers.data = data;
                  return this.teachers;
                })
              );
          }
        },
      });
  }

  onDeleteTeacher(teacherId: number): void {
    if (confirm('¿Está seguro de eliminar al alumno?'))
      this.teachers$ = this.teachersService.deleteTeacher$(teacherId).pipe(
        map((data) => {
          this.teachers.data = data;
          return this.teachers;
        })
      );
  }
}
