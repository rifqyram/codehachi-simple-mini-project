import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { nanoid } from 'nanoid';
import { tap } from 'rxjs/operators';
import { SessionService } from 'src/app/shared/services/session.service';
import Swal from 'sweetalert2';
import { UserForm } from '../models/user-enum';
import { User } from '../models/user-interface';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  form!: FormGroup;
  formField: typeof UserForm = UserForm;
  currentUser?: User;

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.currentUser = this.authService.currentUserValue;

    if (this.currentUser) {
      this.router.navigateByUrl('/');
    }
  }

  buildForm(): void {
    this.form = new FormGroup({
      [this.formField.USERNAME]: new FormControl(null, [Validators.required]),
      [this.formField.PASSWORD]: new FormControl(null, [Validators.required]),
    });
  }

  submitForm(): void {
    if (this.form.valid) {
      const user: User = this.form.value;
      this.authService.login(user);
    }
  }
}
