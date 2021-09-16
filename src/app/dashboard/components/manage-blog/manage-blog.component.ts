import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/auth/models/user-interface';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Blog } from 'src/app/blog/models/blog-interface';
import { BlogService } from 'src/app/blog/services/blog.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage-blog',
  templateUrl: './manage-blog.component.html',
  styleUrls: ['./manage-blog.component.scss'],
})
export class ManageBlogComponent implements OnInit {
  currentUser!: User;
  list: Blog[] = [];

  constructor(
    private readonly blogService: BlogService,
    private readonly authService: AuthService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
    this.loadData();
  }

  loadData(): void {
    this.blogService.getByAuthor(this.currentUser.username).subscribe({
      next: (blog: Blog[]) => {
        this.list = blog;
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

  delete(id: string): void {
    Swal.fire({
      icon: 'warning',
      title: 'Do you want to delete this article?',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Delete',
    }).then((result) => {
      if (result.isConfirmed) {
        this.blogService.delete(id).subscribe({
          next: () => {
            Swal.fire('Deleted!', '', 'success');
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
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info');
      }
    });
  }
}
