import { Injectable } from '@angular/core';
import { Skill } from '../models/teacher.model';

@Injectable({
  providedIn: 'root',
})
export class SkillsService {
  obtenerTiposDatos(): string[] {
    return Object.values(Skill);
  }
}
