import { Injectable } from '@angular/core';
import { Course } from './models/course.model';
import { Observable, concatMap, filter, map, of } from 'rxjs';
import { environment } from 'src/environments/environment.local';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class CoursesService {
  baseURL: string = environment.baseUrl + '/courses';

  constructor(private httpClient: HttpClient) {}

  getCourses$(): Observable<Course[]> {
    return this.httpClient.get<Course[]>(this.baseURL);
  }

  createCourse$(payload: Course): Observable<Course[]> {
    return this.httpClient
      .post<Course>(this.baseURL, payload)
      .pipe(concatMap(() => this.getCourses$()));
  }

  editCourse$(id: number, payload: Course): Observable<Course[]> {
    return this.httpClient
      .put(this.baseURL + '/' + id, payload)
      .pipe(concatMap(() => this.getCourses$()));
  }

  deleteCourse$(id: number): Observable<Course[]> {
    return this.httpClient
      .delete<Course>(this.baseURL + '/' + id)
      .pipe(concatMap(() => this.getCourses$()));
  }

  getCourseById$(id: number): Observable<Course | undefined> {
    return this.httpClient.get<Course>(this.baseURL + '/' + id);
  }

  getCoursesByTeacherId$(id: number): Observable<Course[]> {
    return this.getCourses$().pipe(
      map((courses) => courses.filter((course) => course.teacher === id))
    );
  }
}
