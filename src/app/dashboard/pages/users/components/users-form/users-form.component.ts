import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../models/user.models';
import { RolesService } from '../../services/roles.service';

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.scss'],
})
export class UsersFormComponent {
  userForm: FormGroup;
  roles: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private matDialogRef: MatDialogRef<UsersFormComponent>,
    private rolesService: RolesService,
    @Inject(MAT_DIALOG_DATA) public user?: User
  ) {
    this.roles = this.rolesService.obtenerTiposDatos();

    this.userForm = this.formBuilder.group({
      id: [],
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      lastname: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      dni: ['', [Validators.required, Validators.pattern('^[0-9]+')]],
      email: ['', [Validators.required, Validators.email]],
      role: ['', [Validators.required]],
      registrationDate: [],
      password: [],
      token: [],
    });

    if (this.user) {
      this.userForm.patchValue(this.user);
    }
  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
    } else {
      this.matDialogRef.close(this.userForm.value);
    }
  }
}
