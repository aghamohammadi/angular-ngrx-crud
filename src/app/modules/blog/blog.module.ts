import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromBlog from '@store/blog/blog.reducers';
import { BlogEffects } from '@app/store/blog/blog.effects';
import { BlogDetailsComponent } from './blog-details/blog-details.component';
import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogListItemsComponent } from './components/blog-list-items/blog-list-items.component';
import { ToUrlFormatPipe } from '@app/shared/pipes/to-url-format.pipe';
import { PagerComponent } from '@app/shared/components/pager/pager.component';
import { SharedModule } from '@app/shared/shared.module';
import { BlogEditComponent } from './blog-edit/blog-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BlogCreateComponent } from './blog-create/blog-create.component';
import { BlogInfoComponent } from './components/blog-info/blog-info.component';


@NgModule({
  declarations: [
    BlogListComponent,
    BlogDetailsComponent,
    BlogListItemsComponent,
    BlogEditComponent,
    BlogCreateComponent,
    BlogInfoComponent
  ],
  imports: [
    CommonModule,
    BlogRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    StoreModule.forFeature(fromBlog.blogFeatureKey, fromBlog.blogReducer),
    EffectsModule.forFeature([BlogEffects]),
  ]
})
export class BlogModule { }
