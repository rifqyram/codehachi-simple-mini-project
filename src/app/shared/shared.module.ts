import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { TruncatePipe } from './pipes/truncate.pipe';
import { SessionService } from './services/session.service';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { NumberWithCommaPipe } from './pipes/number-with-comma.pipe';
import { SidenavComponent } from './components/sidenav/sidenav.component';

const components = [HeaderComponent, FooterComponent, SidenavComponent];

const pipes = [TruncatePipe, NumberWithCommaPipe];

const services = [SessionService, JwtInterceptor];

@NgModule({
  declarations: [...components, ...pipes],
  imports: [CommonModule, RouterModule],
  exports: [...components, ...pipes],
  providers: [...services],
})
export class SharedModule {}
