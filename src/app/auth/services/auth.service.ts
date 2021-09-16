import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { User } from '../models/user-interface';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/shared/services/session.service';

const baseUrl = 'https://613b1856110e000017a45470.mockapi.io/api/v1/users';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public currentUser: Observable<User>;
  private currentUserSubject: BehaviorSubject<User>;

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router,
    private readonly sessionService: SessionService
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(sessionService.getSession('user'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  get(id: string): Observable<User> {
    return this.http.get<User>(`${baseUrl}/${id}`);
  }

  get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  getByUsername(username: string): Observable<User[]> {
    return this.http.get<User[]>(`${baseUrl}?username=${username}`);
  }

  create(user: User): Observable<any> {
    return this.http.post(baseUrl, user);
  }

  update(user: User, id: string): Observable<any> {
    return this.http.put<any>(`${baseUrl}/${id}`, user);
  }

  login(user: User): void {
    this.getByUsername(user.username).subscribe({
      next: (user1) => {
        if (user1.length > 0) {
          const match = this.compare(user.password, user1[0].password);
          if (match) {
            Swal.fire({
              icon: 'success',
              title: 'Success Login',
            });
            user1[0].password = '';
            user1[0].token = 'fake-token';
            this.sessionService.setSession('user', JSON.stringify(user1[0]));
            this.currentUserSubject.next(user1[0]);
            this.router.navigateByUrl('/');
            window.location.reload();
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: `Invalid credentials. Please try again.`,
            });
          }
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `User doest exist, please signup`,
          });
        }
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `Error: ${error.message}`,
        });
      },
    });
  }

  // update(id: string, user: User): Observable<any> {
  //   const hashedPassword = bcrypt.hashSync(user.password, 10);

  //   const data = { ...user, hashedPassword };

  //   return this.http.put(`${baseUrl}/${id}`, data);
  // }

  delete(id: string): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  logout(): void {
    this.sessionService.removeSession('user');
    this.router.navigateByUrl('/auth/login');
    window.location.reload();
  }

  private compare(inputPassword: string, storePassword: string): boolean {
    return inputPassword === storePassword ? true : false;
  }
}
