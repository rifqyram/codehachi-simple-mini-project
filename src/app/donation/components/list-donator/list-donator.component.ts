import { Component, OnInit } from '@angular/core';
import { Params } from '@angular/router';
import { SessionService } from 'src/app/shared/services/session.service';
import Swal from 'sweetalert2';
import { Donation } from '../../models/donation-interface';
import { DonationService } from '../../services/donation.service';

@Component({
  selector: 'app-list-donator',
  templateUrl: './list-donator.component.html',
  styleUrls: ['./list-donator.component.scss'],
})
export class ListDonatorComponent implements OnInit {
  list!: Donation[];
  config?: any;

  page = 1;
  count = 0;
  limit = 10;

  constructor(
    private readonly donationService: DonationService,
    private readonly sessionService: SessionService
  ) {}

  ngOnInit(): void {
    this.getAll();
    this.loadData();
    this.config = JSON.parse(this.sessionService.getSession('page'));
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
    this.donationService.getAllPage(params).subscribe({
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
