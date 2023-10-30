export interface User {
  id: number;
  name: string;
  lastname: string;
  email: string;
  password: string; //se debe hashear
  dni: string;
  registrationDate: Date;
}
