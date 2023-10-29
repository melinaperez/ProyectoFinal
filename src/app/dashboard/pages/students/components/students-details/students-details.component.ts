import { Component } from '@angular/core';
import { Student } from '../../models';
import { ActivatedRoute } from '@angular/router';
import { StudentsService } from '../../students.service';

@Component({
  selector: 'app-students-details',
  templateUrl: './students-details.component.html',
  styleUrls: ['./students-details.component.scss'],
})
export class StudentsDetailsComponent {
  student: Student | undefined;
  id: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private studentsService: StudentsService
  ) {
    this.id = parseInt(this.activatedRoute.snapshot.params['id']);
    this.studentsService.getStudentById$(this.id).subscribe((student) => {
      this.student = student;
    });
  }

  onBack(): void {
    window.history.back();
  }
}
