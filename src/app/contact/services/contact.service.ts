import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from '../models/contact-interface';

const baseUrl = 'https://613b1856110e000017a45470.mockapi.io/api/v1/contact';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor(private readonly http: HttpClient) {}

  getAll(): Observable<Contact[]> {
    return this.http.get<Contact[]>(baseUrl);
  }

  get(id: string): Observable<Contact[]> {
    return this.http.get<Contact[]>(`${baseUrl}/${id}`);
  }

  create(contact: Contact): Observable<any> {
    return this.http.post(baseUrl, contact);
  }
}
