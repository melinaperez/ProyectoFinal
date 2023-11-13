export interface Teacher {
  id: number;
  name: string;
  image: string;
  skills: Skill[];
}

export enum Skill {
  FUERZA = 'Fuerza',
  INVISIBILIDAD = 'Invisibilidad',
  VUELO = 'Vuelo',
  PELEA = 'Pelea',
  TELEPATIA = 'Telepatia',
  REGENERACION = 'Regeneracion',
  VELOCIDAD = 'Velocidad',
  MAGIA = 'Magia',
}
