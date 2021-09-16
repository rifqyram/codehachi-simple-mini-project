import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { nanoid } from 'nanoid';
import Swal from 'sweetalert2';
import { ContactField } from './models/contact-enum';
import { Contact } from './models/contact-interface';
import { ContactService } from './services/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  form!: FormGroup;
  formField: typeof ContactField = ContactField;

  constructor(
    private readonly contactService: ContactService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.form = new FormGroup({
      [this.formField.ID]: new FormControl(nanoid(10)),
      [this.formField.USERNAME]: new FormControl(null),
      [this.formField.EMAIL]: new FormControl(null, [
        Validators.required,
        Validators.email,
      ]),
      [this.formField.QUESTION]: new FormControl(null, [
        Validators.required,
        Validators.maxLength(50),
      ]),
    });
  }

  submit(): void {
    if (this.form.valid) {
      const contact: Contact = this.form.value;
      this.contactService.create(contact).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Submit Success',
          });
          this.router.navigateByUrl('/');
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
