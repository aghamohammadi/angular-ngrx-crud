import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './components/nav/nav.component';
import { AppRoutingModule } from '@app/app-routing.module';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PagerComponent } from './components/pager/pager.component';
import { ToUrlFormatPipe } from './pipes/to-url-format.pipe';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    NavComponent,
    PagerComponent,
    ToUrlFormatPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatSidenavModule

  ],
  exports: [
    NavComponent,
    PagerComponent,
    MatProgressSpinnerModule,
    ToUrlFormatPipe,

  ],
  providers: [
    ToUrlFormatPipe
  ],
})
export class SharedModule { }
