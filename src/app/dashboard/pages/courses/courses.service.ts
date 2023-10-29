import { Injectable } from '@angular/core';
import { Course } from './models/course.model';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CoursesService {
  courses: Course[] = [
    {
      id: 1,
      name: 'Flying course',
      description:
        'Tony Stark, también conocido como Iron Man, es un genio multimillonario con la habilidad de volar gracias a su avanzada armadura tecnológica. En este curso, Iron Man te proporcionará una réplica de su armadura y te guiará en su uso en su laboratorio. Te explicará cómo despegar y volar de manera segura, utilizando propulsores en manos y pies. Te equipará con un casco de realidad aumentada y te supervisará mientras ganas confianza en el aire. La lección culminará con un emocionante vuelo juntos, mostrándote acrobacias aéreas.',
      duration: 80,
      endDate: new Date(),
      startDate: new Date(),
      teacher: {
        id: 1,
        nombre: 'Ironman',
        image: 'assets/img/logos/Ironman.jpg',
      },
      //agregar profesor designado (crear entidad profesor)
    },
    {
      id: 2,
      name: 'Strength course',
      description:
        'El Dr. Bruce Banner, conocido como Hulk cuando se enfurece, es uno de los seres más fuertes en el universo Marvel. En este curso, Hulk te llevará a un lugar seguro y comenzará con ejercicios de calentamiento. Luego, te enseñará técnicas de levantamiento de pesas extremadamente pesadas y cómo canalizar la furia para aumentar la fuerza. También aprenderás sobre resistencia y responsabilidad en el uso de la misma.',
      duration: 70,
      endDate: new Date(),
      startDate: new Date(),
      teacher: {
        id: 2,
        nombre: 'Hulk',
        image: 'assets/img/logos/Hulk.jpg',
      },
    },
    {
      id: 3,
      name: 'Magic course',
      description:
        'El Doctor Stephen Strange, conocido como Doctor Strange y Maestro de las Artes Místicas, es un experto en el uso de la magia en el universo Marvel. En este curso, Strange te enseñará los conceptos fundamentales de las artes místicas, incluyendo hechizos básicos, meditación y concentración, viaje astral, manipulación del tiempo y defensa contra amenazas místicas. También enfatizará la ética y responsabilidad en el uso de la magia. El curso culminará en un desafío mágico para demostrar tus habilidades.',
      duration: 80,
      endDate: new Date(),
      startDate: new Date(),
      teacher: {
        id: 3,
        nombre: 'Doctor Strange',
        image: 'assets/img/logos/DrStrange.jpg',
      },
    },
    {
      id: 4,
      name: 'Fighting course',
      description:
        'El Capitán América, Steve Rogers, es un super soldado y experto en combate cuerpo a cuerpo. En este curso, Rogers te enseñará fundamentos de combate, incluyendo técnicas de ataque y defensa. Llevará a cabo un intenso entrenamiento físico para mejorar la fuerza y la resistencia. También instruirá en técnicas de defensa personal, artes marciales y el uso de equipos. El curso destacará la ética y la responsabilidad en el combate, culminando en simulaciones de combate para poner en práctica las habilidades aprendidas.',
      duration: 100,
      endDate: new Date(),
      startDate: new Date(),
      teacher: {
        id: 4,
        nombre: 'Capitán América',
        image: 'assets/img/logos/CapitanAmerica.jpg',
      },
    },
  ];

  getCourses$(): Observable<Course[]> {
    return of(this.courses);
  }

  createCourse$(payload: Course): Observable<Course[]> {
    this.courses.push(payload);
    return of([...this.courses]);
  }

  editCourse$(id: number, payload: Course): Observable<Course[]> {
    this.courses = this.courses.map((c) =>
      c.id === id ? { ...this.courses, ...payload } : c
    );
    return of(this.courses);
  }

  deleteCourse$(id: number): Observable<Course[]> {
    this.courses = this.courses.filter((c) => c.id !== id);
    return of(this.courses);
  }

  getCourseById$(id: number): Observable<Course | undefined> {
    return of(this.courses.find((c) => c.id === id));
  }
}
