import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { UsersDetailsComponent } from './users-details.component';
import { UsersService } from '../../services/users.service';
import { RolesService } from '../../services/roles.service';
import { Router } from '@angular/router';
import { MockProvider } from 'ng-mocks';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SharedModule } from 'src/app/shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Role, User } from '../../models/user.models';
import { of } from 'rxjs';

describe('UsersDetailsComponent', () => {
  let component: UsersDetailsComponent;
  let fixture: ComponentFixture<UsersDetailsComponent>;
  let mockActivatedRoute: any;

  beforeEach(() => {
    mockActivatedRoute = {
      snapshot: {
        params: { id: '1' },
      },
    };

    TestBed.configureTestingModule({
      declarations: [UsersDetailsComponent],
      imports: [HttpClientTestingModule, SharedModule, BrowserAnimationsModule],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    });

    fixture = TestBed.createComponent(UsersDetailsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate back on onBack()', fakeAsync(() => {
    const navigateBackSpy = spyOn(window.history, 'back');

    component.onBack();
    tick();

    expect(navigateBackSpy).toHaveBeenCalled();
  }));
});
