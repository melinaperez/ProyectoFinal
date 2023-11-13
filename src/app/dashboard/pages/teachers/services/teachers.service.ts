import { Injectable } from '@angular/core';
import { Skill, Teacher } from '../models/teacher.model';
import { Observable, concatMap, of } from 'rxjs';
import { environment } from 'src/environments/environment.local';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class TeachersService {
  baseURL: string = environment.baseUrl + '/teachers';

  constructor(private httpClient: HttpClient) {}

  getTeachers$(): Observable<Teacher[]> {
    return this.httpClient.get<Teacher[]>(this.baseURL);
  }

  createTeacher$(payload: Teacher): Observable<Teacher[]> {
    return this.httpClient
      .post<Teacher>(this.baseURL, payload)
      .pipe(concatMap(() => this.getTeachers$()));
  }

  editTeacher$(id: number, payload: Teacher): Observable<Teacher[]> {
    return this.httpClient
      .put(this.baseURL + '/' + id, payload)
      .pipe(concatMap(() => this.getTeachers$()));
  }

  deleteTeacher$(id: number): Observable<Teacher[]> {
    return this.httpClient
      .delete<Teacher>(this.baseURL + '/' + id)
      .pipe(concatMap(() => this.getTeachers$()));
  }

  getTeacherById$(id: number): Observable<Teacher | undefined> {
    return this.httpClient.get<Teacher>(this.baseURL + '/' + id);
  }
}
