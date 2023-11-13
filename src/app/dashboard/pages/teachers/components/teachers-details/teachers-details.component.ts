import { Component } from '@angular/core';
import { Teacher } from '../../models/teacher.model';
import { ActivatedRoute, Router } from '@angular/router';
import { TeachersService } from '../../services/teachers.service';
import { SkillsService } from '../../services/skills.service';
import { CoursesService } from '../../../courses/courses.service';
import { Course } from '../../../courses/models/course.model';
import { map } from 'rxjs';

@Component({
  selector: 'app-teachers-details',
  templateUrl: './teachers-details.component.html',
  styleUrls: ['./teachers-details.component.scss'],
})
export class TeachersDetailsComponent {
  teacher: Teacher | undefined;
  id: number;
  skills: string[] = [];
  courses: Course[] | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private teachersService: TeachersService,
    private skillsService: SkillsService,
    private coursesService: CoursesService,
    private router: Router
  ) {
    this.skills = this.skillsService.obtenerTiposDatos();

    this.id = parseInt(this.activatedRoute.snapshot.params['id']);

    this.teachersService.getTeacherById$(this.id).subscribe((teacher) => {
      this.teacher = teacher;
    });

    this.coursesService.getCoursesByTeacherId$(this.id).subscribe((courses) => {
      this.courses = courses;
    });
  }

  onBack(): void {
    window.history.back();
  }

  redirect(id: number): void {
    this.router.navigate(['/dashboard/courses/' + id]);
  }
}
