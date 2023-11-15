import { Component } from '@angular/core';
import { NavItem } from '.';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Observable, map } from 'rxjs';
import { User } from '../../pages/users/models/user.models';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  navItems: NavItem[] = [
    { icon: 'home', label: 'Home', route: 'home' },
    { icon: 'menu_book', label: 'Cursos', route: 'courses' },
    { icon: 'school', label: 'Alumnos', route: 'students' },
    { icon: 'assignment_ind', label: 'Inscripciones', route: 'enrollments' },
    { icon: 'group', label: 'Profesores', route: 'teachers' },
    { icon: 'account_circle', label: 'Usuarios', route: 'users' },
  ];

  public authUser$: Observable<User | null>;

  constructor(private authService: AuthService) {
    this.authUser$ = this.authService.authUser$;
  }

  get fullName$(): Observable<string> {
    return this.authUser$.pipe(
      map((user) => `${user?.name} ${user?.lastname}`)
    );
  }
  get email$(): Observable<string | undefined> {
    return this.authUser$.pipe(map((user) => user?.email));
  }
}
