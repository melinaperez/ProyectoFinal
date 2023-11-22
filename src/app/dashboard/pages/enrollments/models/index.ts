import { Course } from '../../courses/models/course.model';
import { Student } from '../../students/models';

export interface Enrollment {
  id: number;
  courseId: number;
  studentId: number;
  inscriptionDate: Date;
  course?: Course;
  student?: Student;
}

export interface CreateEnrollmentPayload {
  courseId: number | null;
  studentId: number | null;
  inscriptionDate: Date;
}
