import { Component } from '@angular/core';
import { User } from '../../models/user.models';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../users.service';

@Component({
  selector: 'app-users-details',
  templateUrl: './users-details.component.html',
  styleUrls: ['./users-details.component.scss'],
})
export class UsersDetailsComponent {
  user: User | undefined;
  id: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private usersService: UsersService
  ) {
    this.id = parseInt(this.activatedRoute.snapshot.params['id']);
    this.usersService.getUserById$(this.id).subscribe((user) => {
      this.user = user;
    });
  }

  onBack(): void {
    window.history.back();
  }
}
