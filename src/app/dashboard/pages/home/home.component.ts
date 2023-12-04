import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users/services/users.service';
import { Observable, map, take } from 'rxjs';
import { StudentsService } from '../students/students.service';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Metric } from './models/metric';
import { CarouselImage } from '../../components/carousel/models';
import { EnrollmentActions } from '../enrollments/store/enrollment.actions';
import {
  selectEnrollments,
  selectEnrollmentsIsLoading,
} from '../enrollments/store/enrollment.selectors';
import { Enrollment } from '../enrollments/models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  slides: CarouselImage[] = new Array(3).fill({
    id: -1,
    src: '',
    title: '',
    subtitle: '',
  });
  usersLength: number = 0;
  usersLength$: Observable<number>;
  studentsLength: number = 0;
  studentsLength$: Observable<number>;
  metrics: Metric[] = [];

  constructor(
    private usersService: UsersService,
    private studentsService: StudentsService,
    private store: Store,
    private router: Router
  ) {
    this.slides = [
      {
        src: 'https://www.infobae.com/new-resizer/kHZdEQoZ7wy6MmLa1i-gdbF1CAY=/filters:format(webp):quality(85)/s3.amazonaws.com/arc-wordpress-client-uploads/infobae-wp/wp-content/uploads/2019/04/24133716/avengers-endgame-22.jpg',
        alt: '',
      },
      {
        src: 'https://sm.ign.com/ign_es/news/m/marvel-rep/marvel-reportedly-considered-bringing-back-original-avengers_pdr4.jpg',
        alt: '',
      },
      {
        src: 'https://images.tntdrama.com/tnt/$dyna_params/https%3A%2F%2Fi.cdn.tntdrama.com%2Fassets%2Fimages%2F2022%2F05%2FAvengers-Endgame-KA-1600x900.jpg',
        alt: '',
      },
    ];

    this.usersLength$ = this.usersService.getUsers$().pipe(
      map((data) => {
        this.usersLength = data.length;
        return this.usersLength;
      })
    );

    this.studentsLength$ = this.studentsService.getStudents$().pipe(
      map((data) => {
        this.studentsLength = data.length;
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
    this.router.navigate([`dashboard/${get}`]);
  }
}
