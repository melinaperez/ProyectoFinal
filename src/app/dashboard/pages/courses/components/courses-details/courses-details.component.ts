import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from '../../courses.service';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-courses-details',
  templateUrl: './courses-details.component.html',
  styleUrls: ['./courses-details.component.scss'],
})
export class CoursesDetailsComponent {
  course: Course | undefined;
  id: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private courseService: CoursesService
  ) {
    this.id = parseInt(this.activatedRoute.snapshot.params['id']);
    this.courseService.getCourseById$(this.id).subscribe((course) => {
      this.course = course;
    });
  }

  onBack(): void {
    window.history.back();
  }
}
