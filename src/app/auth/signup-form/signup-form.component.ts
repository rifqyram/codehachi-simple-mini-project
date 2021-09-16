import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { nanoid } from 'nanoid';
import { min, switchMap } from 'rxjs/operators';
import { SessionService } from 'src/app/shared/services/session.service';
import Swal from 'sweetalert2';
import { UserForm } from '../models/user-enum';
import { User } from '../models/user-interface';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss'],
})
export class SignupFormComponent implements OnInit {
  form!: FormGroup;
  formField: typeof UserForm = UserForm;
  currentUser!: User;

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly sessionService: SessionService
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.currentUser = JSON.parse(this.sessionService.getSession('user'));

    if (this.currentUser) {
      this.router.navigateByUrl('/');
    }
  }

  buildForm(): void {
    this.form = new FormGroup({
      [this.formField.ID]: new FormControl(nanoid(10)),
      [this.formField.USERNAME]: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(14),
      ]),
      [this.formField.PASSWORD]: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  submitForm(): void {
    if (this.form.valid) {
      const data: User = this.form.value;
      this.authService.getByUsername(data.username).subscribe({
        next: (user: User[]) => {
          if (user.length > 0) {
            Swal.fire({
              icon: 'warning',
              title: 'Oops...',
              text: 'User already exist',
            });
          } else {
            this.authService.create(data).subscribe({
              next: () => {
                Swal.fire({
                  icon: 'success',
                  title: 'Success',
                  text: 'Success create user',
                });
                this.router.navigateByUrl('/auth/login');
                this.form.reset();
              },
              error: (error) => {
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: `error: ${error.message}`,
                });
              },
            });
          }
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `error: ${error.message}`,
          });
        },
      });
    }
  }
}
