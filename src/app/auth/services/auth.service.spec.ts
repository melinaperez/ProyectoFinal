// import {
//   HttpClientTestingModule,
//   HttpTestingController,
// } from '@angular/common/http/testing';
// import { TestBed } from '@angular/core/testing';
// import { RouterTestingModule } from '@angular/router/testing';
// import { AuthService } from './auth.service';
// import { Role, User } from 'src/app/dashboard/pages/users/models/user.models';
// import { environment } from 'src/environments/environment.local';

// import { MockProvider } from 'ng-mocks';
// import { Router } from '@angular/router';

// fdescribe('AuthService', () => {
//   let authService: AuthService;
//   let httpController: HttpTestingController;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [HttpClientTestingModule, RouterTestingModule],
//       providers: [MockProvider(Router)],
//     });

//     authService = TestBed.inject(AuthService);
//     httpController = TestBed.inject(HttpTestingController);
//   });

//   it('AuthService should be defined', () => {
//     expect(authService).toBeTruthy();
//   });

//   //Compruebo auntenticación con usuario
//   it('should be set an authenticated user when doing login()', () => {
//     const USER_MOCK: User = {
//       id: 1,
//       email: 'fake@mail.com',
//       lastname: 'fakeLastName',
//       name: 'fakeName',
//       token: '84jfdskfsdjh3m2nudisfdusafjd',
//       password: '123456',
//       dni: '36767749',
//       registrationDate: new Date(),
//       role: Role.ADMIN,
//     };

//     authService.login({
//       email: USER_MOCK.email,
//       password: USER_MOCK.password,
//     });

//     httpController
//       .expectOne({
//         method: 'GET',
//         url: `${environment.baseUrl}/users?email=${USER_MOCK.email}&password=${USER_MOCK.password}`,
//       })
//       .flush([USER_MOCK]);

//     authService.authUser$.subscribe({
//       next: (authUser) => {
//         expect(authUser).toBeTruthy();
//         expect(authUser).toEqual(USER_MOCK);
//       },
//     });
//   });

//   //Compruebo el token del usuario logueado
//   it('should verify the user token successfully', () => {
//     localStorage.setItem('token', 'test-token');
//     let authUser: User | null = null;

//     authService.authUser$.subscribe((user) => {
//       authUser = user;
//     });

//     authService.verifyToken().subscribe((result) => {
//       expect(result).toBe(true);
//     });

//     const req = httpController.expectOne(
//       `${environment.baseUrl}/users?token=test-token`
//     );

//     req.flush([{ token: 'test-token' }]);

//     expect(authUser).toBeTruthy();
//   });
// });
