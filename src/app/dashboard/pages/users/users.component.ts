import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Role, User } from './models/user.models';
import { Observable, map } from 'rxjs';
import { UsersService } from './services/users.service';
import { MatDialog } from '@angular/material/dialog';
import { UsersFormComponent } from './components/users-form/users-form.component';
import { genStringRandom } from 'src/app/shared/helpers';
import { Store } from '@ngrx/store';
import { selectAuthUser } from 'src/app/store/auth/auth.selectors';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  users = new MatTableDataSource<User>();
  users$: Observable<MatTableDataSource<User>>;
  userRole$: Observable<Role | undefined>;
  userRoleDefault: Role = Role.USER;

  constructor(
    private usersService: UsersService,
    private matDialog: MatDialog,
    private store: Store
  ) {
    this.userRole$ = this.store
      .select(selectAuthUser)
      .pipe(map((u) => u?.role));

    this.users$ = this.usersService.getUsers$().pipe(
      map((data) => {
        this.users.data = data;
        return this.users;
      })
    );
  }

  openUserDialog(): void {
    this.matDialog
      .open(UsersFormComponent)
      .afterClosed()
      .subscribe({
        next: (v) => {
          if (!!v) {
            this.users$ = this.usersService
              .createUser$({
                ...v,
                id: this.users.data.length + 1,
                registrationDate: new Date(),
                password: '123456',
                token: genStringRandom(20),
              })
              .pipe(
                map((data) => {
                  this.users.data = data;
                  return this.users;
                })
              );
          }
        },
      });
  }

  onEditUser(user: User): void {
    this.matDialog
      .open(UsersFormComponent, {
        data: user,
      })
      .afterClosed()
      .subscribe({
        next: (v) => {
          if (!!v) {
            this.users$ = this.usersService.editUser$(user.id, v).pipe(
              map((data) => {
                this.users.data = data;
                return this.users;
              })
            );
          }
        },
      });
  }

  onDeleteUser(userId: number): void {
    if (confirm('¿Está seguro de eliminar al alumno?'))
      this.users$ = this.usersService.deleteUser$(userId).pipe(
        map((data) => {
          this.users.data = data;
          return this.users;
        })
      );
  }
}
