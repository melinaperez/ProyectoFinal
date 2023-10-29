import { Injectable } from '@angular/core';
import { Student } from './models';
import { StudentsData } from './data/students-data';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class StudentsService {
  students: Student[] = StudentsData;

  getStudents$(): Observable<Student[]> {
    return of(this.students);
  }

  createStudent$(payload: Student): Observable<Student[]> {
    this.students.push(payload);
    return of([...this.students]);
  }

  editStudent$(id: number, payload: Student): Observable<Student[]> {
    this.students = this.students.map((s) =>
      s.id === id ? { ...this.students, ...payload } : s
    );
    return of(this.students);
  }

  deleteStudent$(id: number): Observable<Student[]> {
    this.students = this.students.filter((s) => s.id !== id);
    return of(this.students);
  }

  getStudentById$(id: number): Observable<Student | undefined> {
    return of(this.students.find((s) => s.id === id));
  }
}
