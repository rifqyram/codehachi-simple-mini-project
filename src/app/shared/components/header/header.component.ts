import {
  ChangeDetectorRef,
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/auth/models/user-interface';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isActive?: boolean;
  dropDown?: boolean;
  currentUser!: User;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.isActive = false;
    this.dropDown = false;
    this.currentUser = this.authService.currentUserValue;
  }

  toggle(): void {
    this.isActive = !this.isActive;
  }

  toggleDropDown(): void {
    this.dropDown = !this.dropDown;
  }

  logout(): void {
    this.authService.logout();
  }
}
