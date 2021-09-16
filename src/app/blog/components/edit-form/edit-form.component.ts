import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import slugify from 'slugify';
import { User } from 'src/app/auth/models/user-interface';
import { SessionService } from 'src/app/shared/services/session.service';
import Swal from 'sweetalert2';
import { BlogField } from '../../models/blog-field.enum';
import { Blog } from '../../models/blog-interface';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss'],
})
export class EditFormComponent implements OnInit {
  form!: FormGroup;
  formField: typeof BlogField = BlogField;
  blog!: Blog;
  currentUser?: User;

  constructor(
    private readonly blogService: BlogService,
    private readonly activateRoute: ActivatedRoute,
    private readonly sessionService: SessionService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.buildForm();

    this.currentUser = JSON.parse(this.sessionService.getSession('user'));
    this.loadData();
  }

  buildForm(): void {
    this.form = new FormGroup({
      [this.formField.ID]: new FormControl(null),
      [this.formField.TITLE]: new FormControl(null, [
        Validators.required,
        Validators.maxLength(60),
      ]),
      [this.formField.CONTENT]: new FormControl(null, [Validators.required]),
      [this.formField.CATEGORY]: new FormControl(null, [
        Validators.required,
        Validators.maxLength(20),
      ]),
      [this.formField.AUTHOR]: new FormControl(null),
      [this.formField.URL]: new FormControl(null),
      [this.formField.CREATED_AT]: new FormControl(null),
    });
  }

  loadData(): void {
    this.activateRoute.params
      .pipe(
        switchMap((params) => {
          return this.blogService.get(params.id);
        })
      )
      .subscribe((blog: Blog[]) => {
        this.blog = blog[0];
        this.setFormValue();
      });
  }

  submit(): void {
    if (this.form.valid) {
      const data: Blog = this.form.value;
      const titleSlug = slugify(this.form.get(this.formField.TITLE)?.value, {
        lower: true,
      });
      data.url = `articles/${
        this.form.get(this.formField.ID)?.value
      }/${titleSlug}`;

      this.blogService.update(this.blog.id, data).subscribe({
        next: () => {
          this.form.reset();
          this.router.navigateByUrl('/dashboard/blog');
          Swal.fire({
            icon: 'success',
            title: 'Article updated',
          });
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

  setFormValue(): void {
    if (this.blog) {
      this.form.get(this.formField.ID)?.setValue(this.blog.articleId);
      this.form.get(this.formField.TITLE)?.setValue(this.blog.title);
      this.form.get(this.formField.CATEGORY)?.setValue(this.blog.category);
      this.form.get(this.formField.CONTENT)?.setValue(this.blog.content);
      this.form.get(this.formField.AUTHOR)?.setValue(this.blog.author);
      this.form.get(this.formField.URL)?.setValue(this.blog.url);
      this.form.get(this.formField.CREATED_AT)?.setValue(this.blog.createdAt);
    }
  }
}
