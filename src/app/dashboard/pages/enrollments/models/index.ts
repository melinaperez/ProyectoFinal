import { Course } from '../../courses/models/course.model';
import { Student } from '../../students/models';

export class Enrollment {
  id: number = 0;
  courseId: number = 0;
  studentId: number = 0;
  inscriptionDate: Date = new Date();
  course?: Course;
  student?: Student;
}

export interface CreateEnrollmentPayload {
  courseId: number | null;
  studentId: number | null;
  inscriptionDate: Date;
}
