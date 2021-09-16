import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared/interceptors/auth.guard';
import { ArticleListComponent } from './article-list/article-list.component';
import { BlogFormComponent } from './blog-form/blog-form.component';
import { BlogItemComponent } from './blog-item/blog-item.component';
import { BlogComponent } from './blog.component';
import { EditFormComponent } from './components/edit-form/edit-form.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: BlogComponent,
        pathMatch: 'full',
      },
      {
        path: 'articles',
        component: ArticleListComponent,
      },
      {
        path: 'create',
        component: BlogFormComponent,
        canActivateChild: [AuthGuard],
        canActivate: [AuthGuard],
      },
      {
        path: 'articles/:id/:url',
        component: BlogItemComponent,
      },
      {
        path: 'edit/articles/:id/:url',
        component: EditFormComponent,
        canActivateChild: [AuthGuard],
        canActivate: [AuthGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlogRoutingModule {}
