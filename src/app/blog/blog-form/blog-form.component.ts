import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { nanoid } from 'nanoid';
import slugify from 'slugify';
import { User } from 'src/app/auth/models/user-interface';
import { SessionService } from 'src/app/shared/services/session.service';
import Swal from 'sweetalert2';
import { BlogField } from '../models/blog-field.enum';
import { Blog } from '../models/blog-interface';
import { BlogService } from '../services/blog.service';

@Component({
  selector: 'app-blog-form',
  templateUrl: './blog-form.component.html',
  styleUrls: ['./blog-form.component.scss'],
})
export class BlogFormComponent implements OnInit {
  form!: FormGroup;
  formField: typeof BlogField = BlogField;
  blog?: Blog;
  image?: string[];
  currentUser?: User;

  constructor(
    private readonly blogService: BlogService,
    private readonly router: Router,
    private readonly sessionService: SessionService
  ) {}

  ngOnInit(): void {
    this.buildForm();

    this.currentUser = JSON.parse(this.sessionService.getSession('user'));
  }

  buildForm(): void {
    this.form = new FormGroup({
      [this.formField.ID]: new FormControl(nanoid(8)),
      [this.formField.TITLE]: new FormControl(null, [
        Validators.required,
        Validators.maxLength(60),
      ]),
      [this.formField.CONTENT]: new FormControl(null, [Validators.required]),
      [this.formField.IMAGE]: new FormControl(null, [Validators.required]),
      [this.formField.CATEGORY]: new FormControl(null, [
        Validators.required,
        Validators.maxLength(20),
      ]),
      [this.formField.AUTHOR]: new FormControl(null),
      [this.formField.URL]: new FormControl(null),
      [this.formField.CREATED_AT]: new FormControl(null),
    });
  }

  submit(): void {
    if (this.form.valid) {
      const id = this.form.get(this.formField.ID)?.value;
      const titleUrl = slugify(this.form.get(this.formField.TITLE)?.value, {
        lower: true,
      });

      const data: Blog = (this.blog = {
        ...this.form.value,
        id: id,
        image: this.image,
        createdAt: new Date(),
        author: this.currentUser?.username,
        url: `articles/${id}/${titleUrl}`,
      });

      this.blogService.create(data).subscribe({
        next: (res) => {
          this.form.reset();
          this.router.navigateByUrl('/dashboard/blog');
          Swal.fire({
            icon: 'success',
            title: 'Article created',
          });
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `Error: ${error}.`,
          });
        },
      });
    }
  }

  onFileChange(event: any): void {
    const file = event.dataTransfer
      ? event.dataTransfer.files[0]
      : event.target.files[0];
    const pattern = /image-*/;
    const reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    reader.onload = this.handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }

  private handleReaderLoaded(e: any): void {
    let reader = e.target;
    this.image = reader.result;
  }
}
