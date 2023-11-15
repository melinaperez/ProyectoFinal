import { Injectable } from '@angular/core';
import { Role } from '../models/user.models';

@Injectable({
  providedIn: 'root',
})
export class RolesService {
  obtenerTiposDatos(): string[] {
    return Object.values(Role);
  }
}
