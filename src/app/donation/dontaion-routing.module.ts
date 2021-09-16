import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared/interceptors/auth.guard';
import { DonationFormComponent } from './components/donation-form/donation-form.component';
import { ListDonatorComponent } from './components/list-donator/list-donator.component';
import { DonationComponent } from './donation.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: DonationComponent,
        pathMatch: 'full',
      },
      {
        path: 'donate',
        component: DonationFormComponent,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
      },
      {
        path: 'list',
        component: ListDonatorComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DonationRoutingModule {}
