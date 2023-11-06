import { Injectable } from '@angular/core';
import { Student } from './models';
import { StudentsData } from './data/students-data';
import { Observable, map, of } from 'rxjs';
import { environment } from 'src/environments/environment.local';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class StudentsService {
  students: Student[] = StudentsData;
  baseURL: string = environment.baseUrl + '/students';

  constructor(private httpClient: HttpClient) {}

  getStudents$(): Observable<Student[]> {
    return this.httpClient.get<Student[]>(this.baseURL);
  }

  createStudent$(payload: Student): Observable<Student[]> {
    this.httpClient
      .post<Student>(this.baseURL, payload)
      .subscribe()
      .unsubscribe();
    return this.httpClient.get<Student[]>(this.baseURL);
  }

  editStudent$(id: number, payload: Student): Observable<Student[]> {
    this.httpClient
      .put(this.baseURL + '/' + id, payload)
      .subscribe()
      .unsubscribe();

    return this.httpClient.get<Student[]>(this.baseURL);
  }

  deleteStudent$(id: number): Observable<Student[]> {
    this.httpClient
      .delete<Student>(this.baseURL + '/' + id)
      .subscribe()
      .unsubscribe();
    return this.httpClient.get<Student[]>(this.baseURL);
  }

  getStudentById$(id: number): Observable<Student | undefined> {
    return this.httpClient.get<Student>(this.baseURL + '/' + id);
  }
}
