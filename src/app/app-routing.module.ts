import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
  },
  {
    path: 'blog',
    loadChildren: () =>
      import('./blog/blog-routing.module').then(
        (module) => module.BlogRoutingModule
      ),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth-routing.module').then(
        (module) => module.AuthRoutingModule
      ),
  },
  {
    path: 'donation',
    loadChildren: () =>
      import('./donation/dontaion-routing.module').then(
        (module) => module.DonationRoutingModule
      ),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard-routing.module').then(
        (module) => module.DashboardRoutingModule
      ),
  },
  {
    path: 'contact',
    loadChildren: () =>
      import('./contact/contact-routing.module').then(
        (module) => module.ContactRoutingModule
      ),
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
