import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ManageDonationComponent } from './components/manage-donation/manage-donation.component';
import { GuestBookComponent } from './components/guest-book/guest-book.component';
import { ManageBlogComponent } from './components/manage-blog/manage-blog.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    DashboardComponent,
    ManageDonationComponent,
    GuestBookComponent,
    ManageBlogComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    NgxPaginationModule,
  ],
})
export class DashboardModule {}
