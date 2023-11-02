import { Component } from '@angular/core';
import { UsersService } from '../users/users.service';
import { Observable, map } from 'rxjs';
import { StudentsService } from '../students/students.service';
import { Router } from '@angular/router';
import { Metric } from './models/metric';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  usersLength: number = 0;
  usersLength$: Observable<number>;
  studentsLength: number = 0;
  studentsLength$: Observable<number>;
  today: Date = new Date();
  metrics: Metric[] = [];

  constructor(
    private usersService: UsersService,
    private studentsService: StudentsService,
    private router: Router
  ) {
    this.usersLength$ = this.usersService.getusersLength$().pipe(
      map((data) => {
        this.usersLength = data;
        return this.usersLength;
      })
    );

    this.studentsLength$ = this.studentsService.getStudentsLength$().pipe(
      map((data) => {
        this.studentsLength = data;
        return this.studentsLength;
      })
    );

    this.metrics = [
      {
        quantity: this.studentsLength$,
        name: 'Alumnos',
        entity: 'students',
      },
      {
        quantity: this.usersLength$,
        name: 'Usuarios',
        entity: 'users',
      },
    ];
  }

  get(get: string) {
    console.log('clic');

    this.router.navigate([`dashboard/${get}`]);
  }
}
