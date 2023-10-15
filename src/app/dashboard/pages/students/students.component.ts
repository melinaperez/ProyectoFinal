import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StudentsFormComponent } from './components/students-form/students-form.component';
import { Student } from './models';
import { MatTableDataSource } from '@angular/material/table';
import { StudentsData } from './data/students-data';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
})
export class StudentsComponent {
  students = new MatTableDataSource<Student>(StudentsData);

  constructor(private matDialog: MatDialog) {}

  openStudentDialog(): void {
    this.matDialog
      .open(StudentsFormComponent)
      .afterClosed()
      .subscribe({
        next: (v) => {
          if (!!v) {
            this.students.data = [
              ...this.students.data,
              {
                ...v,
                id: new Date().getTime(),
              },
            ];
          }
        },
      });
  }

  onEditStudent(student: Student): void {
    this.matDialog
      .open(StudentsFormComponent, {
        data: student,
      })
      .afterClosed()
      .subscribe({
        next: (v) => {
          if (!!v) {
            this.students.data = this.students.data.map((s) =>
              s.id === student.id ? { ...s, ...v } : s
            );
          }
        },
      });
  }

  onDeleteStudent(studentId: number): void {
    if (confirm('¿Está seguro de eliminar este alumno?'))
      this.students.data = this.students.data.filter((s) => s.id !== studentId);
  }
}
