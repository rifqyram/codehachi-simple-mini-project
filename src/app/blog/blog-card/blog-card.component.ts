import { Component, OnInit } from '@angular/core';
import { Blog } from '../models/blog-interface';
import { BlogService } from '../services/blog.service';

@Component({
  selector: 'app-blog-card',
  templateUrl: './blog-card.component.html',
  styleUrls: ['./blog-card.component.scss'],
})
export class BlogCardComponent implements OnInit {
  articles?: Blog[];
  constructor(private readonly blogService: BlogService) {}

  ngOnInit(): void {
    this.getAllArticle();
  }

  getAllArticle(): void {
    this.blogService.getAll().subscribe({
      next: (res) => {
        this.articles = res;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getArticle(id: string): void {
    this.blogService.get(id).subscribe({
      next: (res) => console.log(res),
      error: (error) => console.log(error),
    });
  }
}
