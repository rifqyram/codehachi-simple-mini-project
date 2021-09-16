import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Blog } from '../models/blog-interface';
import { map } from 'rxjs/operators';

const baseUrl = 'https://613b1856110e000017a45470.mockapi.io/api/v1/articles';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  constructor(private readonly http: HttpClient) {}

  getAll(): Observable<Blog[]> {
    return this.http.get<Blog[]>(baseUrl);
  }

  get(id: string): Observable<Blog[]> {
    return this.http.get<Blog[]>(`${baseUrl}?articleId=${id}`);
  }

  getByAuthor(author: string): Observable<Blog[]> {
    return this.http.get<Blog[]>(`${baseUrl}?author=${author}`);
  }

  create(data: Blog): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: string, data: Blog): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  findByTitle(title: string): Observable<Blog[]> {
    return this.http.get<Blog[]>(`${baseUrl}?title=${title.toLowerCase()}`);
  }
}
