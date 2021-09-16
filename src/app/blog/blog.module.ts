import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogFormComponent } from './blog-form/blog-form.component';
import { BlogComponent } from './blog.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { BlogRoutingModule } from './blog-routing.module';
import { BlogItemComponent } from './blog-item/blog-item.component';
import { BlogCardComponent } from './blog-card/blog-card.component';
import { SharedModule } from '../shared/shared.module';
import { BlogAsideComponent } from './blog-aside/blog-aside.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BlogService } from './services/blog.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { EditFormComponent } from './components/edit-form/edit-form.component';

@NgModule({
  declarations: [
    BlogFormComponent,
    BlogComponent,
    ArticleListComponent,
    BlogItemComponent,
    BlogCardComponent,
    BlogAsideComponent,
    EditFormComponent,
  ],
  imports: [
    CommonModule,
    BlogRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
  ],
  providers: [BlogService],
})
export class BlogModule {}
