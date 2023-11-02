import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, of } from 'rxjs';
import { User } from 'src/app/dashboard/pages/users/models/user.models';
import { environment } from 'src/environments/environment.local';
import { Login } from '../models/login';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _authUser$ = new BehaviorSubject<User | null>(null);

  public authUser$ = this._authUser$.asObservable();

  constructor(private httpClient: HttpClient, private router: Router) {}

  login(payload: Login): void {
    this.httpClient
      .get<User[]>(
        `${environment.baseUrl}/users?email=${payload.email}&password=${payload.password}`
      )
      .subscribe({
        next: (response) => {
          if (!response.length) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Usuario o contraseña inválidos',
            });
          } else {
            const authUser = response[0];
            this._authUser$.next(authUser);
            localStorage.setItem('token', authUser.token);
            this.router.navigate(['/dashboard/home']);
          }
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error de conexión',
          });
        },
      });
  }

  verifyToken(): Observable<boolean> {
    return this.httpClient
      .get<User[]>(
        `${environment.baseUrl}/users?token=${localStorage.getItem('token')}`
      )
      .pipe(
        map((users) => {
          if (!users.length) {
            return false;
          } else {
            const authUser = users[0];
            this._authUser$.next(authUser);
            localStorage.setItem('token', authUser.token);
            return true;
          }
        })
      );
  }

  logout(): void {
    this._authUser$.next(null);
    localStorage.removeItem('token');
    this.router.navigate(['/auth/login']);
  }
}
