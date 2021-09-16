import { Component, OnInit } from '@angular/core';
import { Params } from '@angular/router';
import { User } from 'src/app/auth/models/user-interface';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Donation } from 'src/app/donation/models/donation-interface';
import { DonationService } from 'src/app/donation/services/donation.service';
import { SessionService } from 'src/app/shared/services/session.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage-donation',
  templateUrl: './manage-donation.component.html',
  styleUrls: ['./manage-donation.component.scss'],
})
export class ManageDonationComponent implements OnInit {
  list!: Donation[];
  config?: any;
  currentUser!: User;

  page = 1;
  count = 0;
  limit = 10;

  constructor(
    private readonly donationService: DonationService,
    private readonly sessionService: SessionService,
    private readonly authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getAll();
    this.currentUser = this.authService.currentUserValue;
    this.config = JSON.parse(this.sessionService.getSession('page'));
    this.loadData();
  }

  getRequestParam(page: number, pageSize: number): Params {
    let params: Params = {};

    if (page) {
      params[`page`] = page;
    }

    if (pageSize) {
      params[`limit`] = pageSize;
    }

    return params;
  }

  loadData(): void {
    const params = this.getRequestParam(this.page, this.limit);
    this.donationService
      .getByName(this.currentUser?.username, params)
      .subscribe({
        next: (donation: Donation[]) => {
          this.list = donation;
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Ooops!',
            text: `Error: ${error}`,
          });
        },
      });
  }

  getAll(): void {
    this.donationService.getAll().subscribe({
      next: (donation: Donation[]) => {
        const config = {
          page: this.page,
          limit: this.limit,
          count: donation.length,
        };

        this.sessionService.setSession('page', JSON.stringify(config));
      },
    });
  }

  handlePageChange(event: any): void {
    this.page = event;
    this.loadData();
  }

  handleSizeChange(event: any): void {
    this.limit = event.target.value;
    this.page = 1;
    this.loadData();
  }
}
