import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { BlogModule } from './blog/blog.module';
import { ContactModule } from './contact/contact.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { DonationModule } from './donation/donation.module';
import { HomeModule } from './home/home.module';
import { JwtInterceptor } from './shared/interceptors/jwt.interceptor';
import { SharedModule } from './shared/shared.module';

const modules = [
  HomeModule,
  SharedModule,
  BlogModule,
  AuthModule,
  DonationModule,
  ContactModule,
  DashboardModule,
];

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, ...modules],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
