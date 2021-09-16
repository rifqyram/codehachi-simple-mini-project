import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared/interceptors/auth.guard';
import { GuestBookComponent } from './components/guest-book/guest-book.component';
import { ManageBlogComponent } from './components/manage-blog/manage-blog.component';
import { ManageDonationComponent } from './components/manage-donation/manage-donation.component';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'blog',
        component: ManageBlogComponent,
      },
      {
        path: 'donation',
        component: ManageDonationComponent,
      },
      {
        path: 'guest-book',
        component: GuestBookComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
