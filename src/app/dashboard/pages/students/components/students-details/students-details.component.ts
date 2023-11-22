import { Component } from '@angular/core';
import { Student } from '../../models';
import { ActivatedRoute } from '@angular/router';
import { StudentsService } from '../../students.service';
import { CoursesService } from '../../../courses/courses.service';
import { Observable, map } from 'rxjs';
import { Course } from '../../../courses/models/course.model';

@Component({
  selector: 'app-students-details',
  templateUrl: './students-details.component.html',
  styleUrls: ['./students-details.component.scss'],
})
export class StudentsDetailsComponent {
  student: Student | undefined;
  id: number;
  courses$: Observable<any[]>;
  courses: any[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private studentsService: StudentsService,
    private coursesService: CoursesService
  ) {
    this.id = parseInt(this.activatedRoute.snapshot.params['id']);
    this.studentsService.getStudentById$(this.id).subscribe((student) => {
      this.student = student;
    });

    this.courses$ = this.coursesService.getCoursesByStudentId$(this.id).pipe(
      map((data) => {
        this.courses = data;
        return this.courses;
      })
    );
  }

  onBack(): void {
    window.history.back();
  }
}
