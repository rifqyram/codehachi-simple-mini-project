import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Blog } from '../models/blog-interface';
import { BlogService } from '../services/blog.service';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-blog-item',
  templateUrl: './blog-item.component.html',
  styleUrls: ['./blog-item.component.scss'],
})
export class BlogItemComponent implements OnInit {
  blog: Blog = {
    id: '',
    articleId: '',
    author: '',
    category: '',
    content: '',
    createdAt: '',
    image: '',
    title: '',
    url: '',
  };

  constructor(
    private readonly activateRoute: ActivatedRoute,
    private readonly blogService: BlogService
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.activateRoute.params
      .pipe(
        switchMap((params) => {
          return this.blogService.get(params.id);
        })
      )
      .subscribe((blog: Blog[]) => {
        this.blog = blog[0];
      });
  }
}
