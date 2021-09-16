import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UserForm } from '../models/user-enum';
import { User } from '../models/user-interface';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
})
export class UserManagementComponent implements OnInit {
  form!: FormGroup;
  formField: typeof UserForm = UserForm;

  constructor(private readonly authService: AuthService) {}

  ngOnInit(): void {
    this.buildForm();
    this.loadData();
  }

  buildForm(): void {
    this.form = new FormGroup({
      id: new FormControl(null),
      [this.formField.ID]: new FormControl(null),
      [this.formField.USERNAME]: new FormControl(null),
      [this.formField.PASSWORD]: new FormControl(null, [
        Validators.minLength(8),
        Validators.required,
      ]),
    });
  }

  loadData(): void {
    const currentUser = this.authService.currentUserValue;

    this.authService.get(currentUser.id).subscribe({
      next: (user: User) => {
        this.setFormValue(user);
      },
    });
  }

  submit(): void {
    if (this.form.valid) {
      const data: User = this.form.value;
      this.authService.update(data, data.id).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'User successfully updated',
          });
          window.location.reload();
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `Error: ${error.message}.`,
          });
        },
      });
    }
  }

  setFormValue(user: User) {
    this.form.get('id')?.setValue(user.id);
    this.form.get(this.formField.ID)?.setValue(user.userId);
    this.form.get(this.formField.USERNAME)?.setValue(user.username);
    this.form.get(this.formField.PASSWORD)?.setValue(user.password);
  }
}
