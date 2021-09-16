import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';
import { Donation } from '../models/donation-interface';

const baseUrl = 'https://613b1856110e000017a45470.mockapi.io/api/v1/donations';

@Injectable({
  providedIn: 'root',
})
export class DonationService {
  constructor(private readonly http: HttpClient) {}

  getAll(): Observable<Donation[]> {
    return this.http.get<Donation[]>(baseUrl);
  }

  getAllPage(params: Params): Observable<Donation[]> {
    return this.http.get<any>(baseUrl, { params });
  }

  get(id: string): Observable<Donation> {
    return this.http.get<Donation>(`${baseUrl}/${id}`);
  }

  getByName(name: string, params: Params): Observable<Donation[]> {
    return this.http.get<Donation[]>(`${baseUrl}?name=${name}`, { params });
  }

  create(donation: Donation): Observable<any> {
    return this.http.post(baseUrl, donation);
  }
}
