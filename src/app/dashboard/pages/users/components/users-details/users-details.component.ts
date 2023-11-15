import { Component } from '@angular/core';
import { User } from '../../models/user.models';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { RolesService } from '../../services/roles.service';

@Component({
  selector: 'app-users-details',
  templateUrl: './users-details.component.html',
  styleUrls: ['./users-details.component.scss'],
})
export class UsersDetailsComponent {
  user: User | undefined;
  id: number;
  roles: string[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private usersService: UsersService,
    private rolesService: RolesService
  ) {
    this.roles = this.rolesService.obtenerTiposDatos();

    this.id = parseInt(this.activatedRoute.snapshot.params['id']);
    this.usersService.getUserById$(this.id).subscribe((user) => {
      this.user = user;
    });
  }

  onBack(): void {
    window.history.back();
  }
}
