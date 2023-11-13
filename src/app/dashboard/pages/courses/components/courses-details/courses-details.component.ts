import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from '../../courses.service';
import { Course } from '../../models/course.model';
import { Teacher } from '../../../teachers/models/teacher.model';
import { TeachersService } from '../../../teachers/services/teachers.service';

@Component({
  selector: 'app-courses-details',
  templateUrl: './courses-details.component.html',
  styleUrls: ['./courses-details.component.scss'],
})
export class CoursesDetailsComponent {
  course: Course | undefined;
  id: number;
  teacher?: Teacher;

  constructor(
    private activatedRoute: ActivatedRoute,
    private courseService: CoursesService,
    private teachersService: TeachersService
  ) {
    this.id = parseInt(this.activatedRoute.snapshot.params['id']);
    this.courseService.getCourseById$(this.id).subscribe((course) => {
      this.course = course;
      if (this.course) {
        this.teachersService
          .getTeacherById$(this.course?.teacher)
          .subscribe((teacher) => {
            this.teacher = teacher;
          });
      }
    });
  }

  onBack(): void {
    window.history.back();
  }
}
