import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { nanoid } from 'nanoid';
import { User } from 'src/app/auth/models/user-interface';
import { AuthService } from 'src/app/auth/services/auth.service';
import Swal from 'sweetalert2';
import { DonationField } from '../../models/donation-enum';
import { Donation } from '../../models/donation-interface';
import { DonationService } from '../../services/donation.service';

@Component({
  selector: 'app-donation-form',
  templateUrl: './donation-form.component.html',
  styleUrls: ['./donation-form.component.scss'],
})
export class DonationFormComponent implements OnInit {
  form!: FormGroup;
  formField: typeof DonationField = DonationField;

  constructor(
    private readonly donationService: DonationService,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.form = new FormGroup({
      [this.formField.ID]: new FormControl(nanoid(10)),
      [this.formField.NAME]: new FormControl(null),
      [this.formField.AMOUNT]: new FormControl(null, [
        Validators.required,
        Validators.min(1),
      ]),
      [this.formField.MESSAGE]: new FormControl(null, [
        Validators.maxLength(30),
      ]),
      [this.formField.DONATE_AT]: new FormControl(null),
    });
  }

  submit(): void {
    if (this.form.valid) {
      const currentUser: User = this.authService.currentUserValue;
      const donation: Donation = this.form.value;
      donation.donatedAt = new Date();
      donation.name = currentUser.username;

      this.donationService.create(donation).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Donation Success',
          });
          this.router.navigateByUrl('/donation');
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Ooops!',
            text: `Error: ${error}`,
          });
        },
      });
    }
  }
}
