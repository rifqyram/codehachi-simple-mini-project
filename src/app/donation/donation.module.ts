import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DonationComponent } from './donation.component';
import { DonationFormComponent } from './components/donation-form/donation-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DonationService } from './services/donation.service';
import { HttpClientModule } from '@angular/common/http';
import { ListDonatorComponent } from './components/list-donator/list-donator.component';
import { SharedModule } from '../shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    DonationComponent,
    DonationFormComponent,
    ListDonatorComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    SharedModule,
    NgxPaginationModule,
  ],
  providers: [DonationService],
})
export class DonationModule {}
