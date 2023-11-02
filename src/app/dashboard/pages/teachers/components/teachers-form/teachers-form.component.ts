import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Teacher } from '../../models/teacher.model';
import { Skill } from '../../models/teacher.model';

@Component({
  selector: 'app-teachers-form',
  templateUrl: './teachers-form.component.html',
  styleUrls: ['./teachers-form.component.scss'],
})
export class TeachersFormComponent {
  teacherForm: FormGroup;
  selectedSkills: Skill[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private matDialogRef: MatDialogRef<TeachersFormComponent>,
    @Inject(MAT_DIALOG_DATA) public teacher?: Teacher
  ) {
    this.teacherForm = this.formBuilder.group({
      id: [],
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      image: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?'
          ),
        ],
      ],
      skills: [''],
    });

    if (this.teacher) {
      this.selectedSkills = this.teacher?.skills
      this.teacherForm.patchValue(this.teacher);
    }
  }

  onSubmit(): void {
    if (this.teacherForm.invalid) {
      this.teacherForm.markAllAsTouched();
    } else {
      this.matDialogRef.close(this.teacherForm.value);
    }
  }
}
