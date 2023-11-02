import { Injectable } from '@angular/core';
import { Skill, Teacher } from './models/teacher.model';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TeachersService {
  teachers: Teacher[] = [
    {
      id: 1,
      name: 'Ironman',
      image: 'assets/img/logos/Ironman.jpg',
      skills: [Skill.FUERZA],
    },
    {
      id: 2,
      name: 'Hulk',
      image: 'assets/img/logos/Hulk.jpg',
      skills: [Skill.FUERZA, Skill.PELEA],
    },
    {
      id: 3,
      name: 'Doctor Strange',
      image: 'assets/img/logos/DrStrange.jpg',
      skills: [Skill.MAGIA, Skill.PELEA],
    },
    {
      id: 4,
      name: 'Capitán América',
      image: 'assets/img/logos/CapitanAmerica.jpg',
      skills: [Skill.PELEA, Skill.FUERZA],
    },
  ];

  getTeachers$(): Observable<Teacher[]> {
    return of(this.teachers);
  }

  createTeacher$(payload: Teacher): Observable<Teacher[]> {
    this.teachers.push(payload);
    return of([...this.teachers]);
  }

  editTeacher$(id: number, payload: Teacher): Observable<Teacher[]> {
    this.teachers = this.teachers.map((t) =>
      t.id === id ? { ...this.teachers, ...payload } : t
    );
    return of(this.teachers);
  }

  deleteTeacher$(id: number): Observable<Teacher[]> {
    this.teachers = this.teachers.filter((t) => t.id !== id);
    return of(this.teachers);
  }

  getTeacherById$(id: number): Observable<Teacher | undefined> {
    return of(this.teachers.find((t) => t.id === id));
  }
}
