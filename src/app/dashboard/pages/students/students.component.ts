import {
  AfterContentChecked,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StudentsFormComponent } from './components/students-form/students-form.component';
import { Student } from './models';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, map } from 'rxjs';
import { StudentsService } from './students.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
})
export class StudentsComponent implements AfterContentChecked {
  students = new MatTableDataSource<Student>();
  students$: Observable<MatTableDataSource<Student>>;

  constructor(
    private studentsService: StudentsService,
    private matDialog: MatDialog,
    private changeDetector: ChangeDetectorRef
  ) {
    this.students$ = this.studentsService.getStudents$().pipe(
      map((data) => {
        this.students.data = data;
        return this.students;
      })
    );
  }

  //Esto lo agrego porque al eliminar un elemento me estaba dando un error la tabla (ExpressionChangedAfterItHasBeenCheckedError)
  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }

  openStudentDialog(): void {
    this.matDialog
      .open(StudentsFormComponent)
      .afterClosed()
      .subscribe({
        next: (v) => {
          if (!!v) {
            this.students$ = this.studentsService
              .createStudent$({
                ...v,
              })
              .pipe(
                map((data: Student[]) => {
                  this.students.data = data;
                  return this.students;
                })
              );
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
            this.students$ = this.studentsService
              .editStudent$(student.id, v)
              .pipe(
                map((data) => {
                  this.students.data = data;
                  return this.students;
                })
              );
          }
        },
      });
  }

  onDeleteStudent(studentId: number): void {
    if (confirm('¿Está seguro de eliminar al alumno?'))
      this.students$ = this.studentsService.deleteStudent$(studentId).pipe(
        map(() => {
          this.students.data = this.students.data.filter(
            (student) => student.id !== studentId
          );
          return this.students;
        })
      );
  }
}
