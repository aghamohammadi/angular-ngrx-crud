import { NgModule } from '@angular/core';
import { RouterModule, Routes, UrlSegment } from '@angular/router';
import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogDetailsComponent } from './blog-details/blog-details.component';
import { BlogEditComponent } from './blog-edit/blog-edit.component';
import { BlogCreateComponent } from './blog-create/blog-create.component';

export function digitsMatcher(url: UrlSegment[]) {
  const re = /^\d+$/;
  const match = re.exec(url[0].path);
  if (match) {
    return {
      consumed: url,
      posParams:
      {
        id: new UrlSegment(url[0].path, {}),
        title: new UrlSegment(url.length > 1 ? url[1].path : "", {})

      }
    };
  }
  return null;
}

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '', component: BlogListComponent
      },

      {
        matcher: digitsMatcher,
        component: BlogDetailsComponent
      },
      {
        path: 'create',
        component: BlogCreateComponent
      },
      {
        path: 'edit',
        children: [
          {
            path: ':id', component: BlogEditComponent
          },
        ]
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
