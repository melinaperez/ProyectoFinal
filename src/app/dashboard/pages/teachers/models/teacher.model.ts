export interface Teacher {
  id: number;
  name: string;
  image: string;
  skills: Skill[];
}

export enum Skill {
  FUERZA,
  INVISIBILIDAD,
  VUELO,
  PELEA,
  TELEPATIA,
  REGENERACION,
  VELOCIDAD,
  MAGIA,
}
