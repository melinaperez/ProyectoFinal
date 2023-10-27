import { Injectable } from '@angular/core';
import { Course } from './models/models';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CoursesService {
  courses: Course[] = [
    {
      id: 1,
      description: 'Javascript',
      duration: 80,
      endDate: new Date(),
      startDate: new Date(),
    },
    {
      id: 2,
      description: 'Desarrollo web',
      duration: 70,
      endDate: new Date(),
      startDate: new Date(),
    },
  ];

  getCourses$(): Observable<Course[]> {
    return of(this.courses);
  }

  createCourse$(payload: Course): Observable<Course[]> {
    this.courses.push(payload);
    return of([...this.courses]);
  }

  editCourse$(id: number, payload: Course): Observable<Course[]> {
    return of(
      this.courses.map((c) =>
        c.id === id ? { ...this.courses, ...payload } : c
      )
    );
  }
}
