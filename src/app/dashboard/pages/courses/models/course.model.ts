import { Teacher } from './teacher.model';

export interface Course {
  id: number;
  name: string;
  description: string;
  duration: number;
  startDate: Date;
  endDate: Date;
  teacher: Teacher;
}
