import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { UsersService } from './users.service';
import { environment } from 'src/environments/environment.local';
import { Role, User } from '../models/user.models';
import { RouterTestingModule } from '@angular/router/testing';
import { MockProvider } from 'ng-mocks';
import { Router } from '@angular/router';

describe('UsersService', () => {
  let service: UsersService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [MockProvider(Router)],
    });

    service = TestBed.inject(UsersService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve users', () => {
    const mockUsers: User[] = [
      {
        id: 1,
        name: 'Name Test',
        lastname: 'Lastname Test',
        email: 'email@test.com',
        password: '123456',
        dni: '11111111',
        registrationDate: new Date(),
        token: 'ququququajajaja',
        role: Role.USER,
      },
    ];

    service.getUsers$().subscribe((users) => {
      expect(users).toEqual(mockUsers);
    });

    const req = httpTestingController.expectOne(`${environment.baseUrl}/users`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockUsers);
  });

  it('should create a new user', () => {
    const newUser: User = {
      id: 2,
      name: 'Name Test2',
      lastname: 'Lastname Test2',
      email: 'email@test2.com',
      password: '123456',
      dni: '22222222',
      registrationDate: new Date(),
      token: 'quququasdasdquajajaja',
      role: Role.ADMIN,
    };

    service.createUser$(newUser).subscribe((users) => {
      expect(users.length).toBeGreaterThan(0);
    });

    const req = httpTestingController.expectOne(`${environment.baseUrl}/users`);
    expect(req.request.method).toEqual('POST');
    req.flush({});
  });

  it('should edit an existing user', () => {
    const userId = 1;
    const updatedUser: User = {
      id: userId,
      name: 'Name Test',
      lastname: 'Lastname Test',
      email: 'email@test.com',
      password: '123456',
      dni: '11111111',
      registrationDate: new Date(),
      token: 'ququququajajaja',
      role: Role.USER,
    };

    service.editUser$(userId, updatedUser).subscribe((users) => {
      expect(users.length).toBeGreaterThan(0);
    });

    const req = httpTestingController.expectOne(
      `${environment.baseUrl}/users/${userId}`
    );
    expect(req.request.method).toEqual('PUT');
    req.flush({});
  });

  it('should delete an existing user', () => {
    const userId = 1;

    service.deleteUser$(userId).subscribe((users) => {
      expect(users.length).toBeGreaterThan(0);
    });

    const req = httpTestingController.expectOne(
      `${environment.baseUrl}/users/${userId}`
    );
    expect(req.request.method).toEqual('DELETE');
    req.flush({});
  });

  it('should retrieve a user by ID', () => {
    const userId = 1;
    const mockUser: User = {
      id: userId,
      name: 'Name Test',
      lastname: 'Lastname Test',
      email: 'email@test.com',
      password: '123456',
      dni: '11111111',
      registrationDate: new Date(),
      token: 'ququququajajaja',
      role: Role.USER,
    };

    service.getUserById$(userId).subscribe((user) => {
      expect(user).toEqual(mockUser);
    });

    const req = httpTestingController.expectOne(
      `${environment.baseUrl}/users/${userId}`
    );
    expect(req.request.method).toEqual('GET');
    req.flush(mockUser);
  });
});
