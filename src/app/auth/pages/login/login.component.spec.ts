// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { LoginComponent } from './login.component';
// import { ReactiveFormsModule } from '@angular/forms';
// import { AuthService } from '../../services/auth.service';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { RouterModule } from '@angular/router';
// import { SharedModule } from 'src/app/shared/shared.module';

// describe('LoginComponent', () => {
//   let component: LoginComponent;
//   let fixture: ComponentFixture<LoginComponent>;
//   let authService: AuthService;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [LoginComponent],
//       imports: [HttpClientTestingModule, ReactiveFormsModule, SharedModule],
//       providers: [AuthService],
//     });

//     fixture = TestBed.createComponent(LoginComponent);
//     component = fixture.componentInstance;
//     authService = TestBed.inject(AuthService);
//   });

//   //Compruebo que el componente se crea correctamente.
//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   //Compruebo que el formulario de inicio de sesión se inicializa correctamente con email y contraseña.
//   it('should initialize the login form with email and password controls', () => {
//     expect(component.loginForm.get('email')).toBeTruthy();
//     expect(component.loginForm.get('password')).toBeTruthy();
//   });

//   //Compruebo que, si el formulario es inválido, se marcan todos los campos como toched después de llamar a login().
//   it('should mark all form controls as touched if the form is invalid', () => {
//     const emailControl = component.loginForm.get('email');
//     emailControl?.setValue('invalid-email');
//     component.login();
//     expect(emailControl?.touched).toBe(true);
//   });

//   //Compruebo que authService.login se llama correctamente cuando el formulario es válido.
//   it('should call authService.login when the form is valid', () => {
//     const authServiceSpy = spyOn(authService, 'login');
//     const emailControl = component.loginForm.get('email');
//     const passwordControl = component.loginForm.get('password');
//     emailControl?.setValue('test@example.com');
//     passwordControl?.setValue('testpassword');
//     component.login();
//     expect(authServiceSpy).toHaveBeenCalledWith({
//       email: 'test@example.com',
//       password: 'testpassword',
//     });
//   });
// });
