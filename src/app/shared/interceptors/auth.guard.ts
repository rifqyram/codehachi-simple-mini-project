import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.authorized();
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.authorized();
  }

  authorized(): boolean {
    const currentUser = this.authService.currentUserValue;

    if (currentUser) {
      return true;
    }

    this.router.navigateByUrl('/auth/login');
    Swal.fire({
      icon: 'warning',
      title: 'Oops...',
      text: 'You need to login first to access this page',
    });
    return false;
  }
}
