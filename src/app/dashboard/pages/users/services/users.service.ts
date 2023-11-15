import { Injectable } from '@angular/core';
import { User } from '../models/user.models';
import { Observable, concatMap, of } from 'rxjs';
import { environment } from 'src/environments/environment.local';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class UsersService {
  baseURL: string = environment.baseUrl + '/users';

  constructor(private httpClient: HttpClient) {}

  getUsers$(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.baseURL);
  }

  createUser$(payload: User): Observable<User[]> {
    return this.httpClient
      .post<User>(this.baseURL, payload)
      .pipe(concatMap(() => this.getUsers$()));
  }

  editUser$(id: number, payload: User): Observable<User[]> {
    return this.httpClient
      .put(this.baseURL + '/' + id, payload)
      .pipe(concatMap(() => this.getUsers$()));
  }

  deleteUser$(id: number): Observable<User[]> {
    return this.httpClient
      .delete<User>(this.baseURL + '/' + id)
      .pipe(concatMap(() => this.getUsers$()));
  }

  getUserById$(id: number): Observable<User | undefined> {
    return this.httpClient.get<User>(this.baseURL + '/' + id);
  }
}
