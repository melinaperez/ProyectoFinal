import { Injectable } from '@angular/core';
import { User } from './models/user.models';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UsersService {
  users: User[] = [
    {
      id: 1,
      name: 'Damara',
      lastname: 'Vose',
      password: 'fS5967eX8}+vg',
      dni: '471692748',
      registrationDate: new Date('2023-4-20'),
      email: 'dvose0@friendfeed.com',
    },
    {
      id: 2,
      name: 'Moshe',
      lastname: 'Sedgmond',
      password: 'jZ973HG}a,Hmm_',
      dni: '677017106',
      registrationDate: new Date('2022-12-4'),
      email: 'msedgmond1@shinystat.com',
    },
    {
      id: 3,
      name: 'Veriee',
      lastname: 'Caddan',
      password: 'fT267IqBi0tkL',
      dni: '88446114',
      registrationDate: new Date('2022-11-20'),
      email: 'vcaddan2@un.org',
    },
    {
      id: 4,
      name: 'Burch',
      lastname: 'Bridgwood',
      password: 'kL677Cu,y>dRtV',
      dni: '799037416',
      registrationDate: new Date('2023-1-22'),
      email: 'bbridgwood3@tmall.com',
    },
    {
      id: 5,
      name: 'Hyman',
      lastname: 'Poate',
      password: 'vP827muwNgSg{=+',
      dni: '569257363',
      registrationDate: new Date('2023-5-18'),
      email: 'hpoate4@privacy.gov.au',
    },
    {
      id: 6,
      name: 'Crin',
      lastname: 'Gibbings',
      password: 'bL696DN?0',
      dni: '328297834',
      registrationDate: new Date('2023-4-8'),
      email: 'cgibbings5@theglobeandmail.com',
    },
    {
      id: 7,
      name: 'Merilyn',
      lastname: 'Stookes',
      password: 'fV396#|IR7',
      dni: '885512766',
      registrationDate: new Date('2023-9-21'),
      email: 'mstookes6@ibm.com',
    },
    {
      id: 8,
      name: 'Elnora',
      lastname: 'Witcherley',
      password: 'yE536T$jkmo<D<J',
      dni: '506274142',
      registrationDate: new Date('2023-2-4'),
      email: 'ewitcherley7@sciencedaily.com',
    },
    {
      id: 9,
      name: 'Brianna',
      lastname: 'Maha',
      password: 'gU3946H9E}',
      dni: '963856448',
      registrationDate: new Date('2023-9-18'),
      email: 'bmaha8@nydailynews.com',
    },
    {
      id: 10,
      name: 'Zerk',
      lastname: 'Aldwinckle',
      password: 'oF341,sSwp$IC#%3',
      dni: '695384445',
      registrationDate: new Date('2023-1-17'),
      email: 'zaldwinckle9@biblegateway.com',
    },
    {
      id: 11,
      name: 'Joeann',
      lastname: 'Rutt',
      password: 'zX938#K}',
      dni: '680016247',
      registrationDate: new Date('2022-12-18'),
      email: 'jrutta@berkeley.edu',
    },
    {
      id: 12,
      name: 'Farlee',
      lastname: 'Hynd',
      password: 'zK887bj#',
      dni: '13032126',
      registrationDate: new Date('2023-2-1'),
      email: 'fhyndb@mayoclinic.com',
    },
    {
      id: 13,
      name: 'Eilis',
      lastname: 'Tassell',
      password: 'kM9922)rw9xM`(',
      dni: '122937601',
      registrationDate: new Date('2022-12-15'),
      email: 'etassellc@csmonitor.com',
    },
    {
      id: 14,
      name: 'Kele',
      lastname: 'Winterborne',
      password: 'uD840,`4zTlH7',
      dni: '391990614',
      registrationDate: new Date('2022-12-31'),
      email: 'kwinterborned@wikimedia.org',
    },
    {
      id: 15,
      name: 'Ramonda',
      lastname: 'Sabin',
      password: 'xB432BD>2$$Uq<x',
      dni: '498666109',
      registrationDate: new Date('2022-12-29'),
      email: 'rsabine@biglobe.ne.jp',
    },
  ];

  getUsers$(): Observable<User[]> {
    return of(this.users);
  }

  createUser$(payload: User): Observable<User[]> {
    this.users.push(payload);
    return of([...this.users]);
  }

  editUser$(id: number, payload: User): Observable<User[]> {
    this.users = this.users.map((u) =>
      u.id === id ? { ...this.users, ...payload } : u
    );
    return of(this.users);
  }

  deleteUser$(id: number): Observable<User[]> {
    this.users = this.users.filter((u) => u.id !== id);
    return of(this.users);
  }

  getUserById$(id: number): Observable<User | undefined> {
    return of(this.users.find((u) => u.id === id));
  }
}
