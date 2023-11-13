import { Injectable } from '@angular/core';
import { Student } from './models';
import { Observable, concatMap, map, of } from 'rxjs';
import { environment } from 'src/environments/environment.local';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class StudentsService {
  baseURL: string = environment.baseUrl + '/students';

  constructor(private httpClient: HttpClient) {}

  getStudents$(): Observable<Student[]> {
    return this.httpClient.get<Student[]>(this.baseURL);
  }

  createStudent$(payload: Student): Observable<Student[]> {
    return this.httpClient
      .post<Student>(this.baseURL, payload)
      .pipe(concatMap(() => this.getStudents$()));
  }

  editStudent$(id: number, payload: Student): Observable<Student[]> {
    return this.httpClient
      .put(this.baseURL + '/' + id, payload)
      .pipe(concatMap(() => this.getStudents$()));
  }

  deleteStudent$(id: number): Observable<Student[]> {
    return this.httpClient
      .delete<Student>(this.baseURL + '/' + id)
      .pipe(concatMap(() => this.getStudents$()));
  }

  getStudentById$(id: number): Observable<Student | undefined> {
    return this.httpClient.get<Student>(this.baseURL + '/' + id);
  }
}
