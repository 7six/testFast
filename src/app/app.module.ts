import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';

import { CollapseModule, BsDropdownModule } from 'ngx-bootstrap';

import { AppRouterModule } from './app-router/app-router.module';

import { AppComponent } from './app.component';
import { MovieComponent } from './movie/movie.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';

import { MovieService } from './movie.service';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    MovieComponent,
    MovieDetailComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRouterModule,
    HttpClientModule,
    CollapseModule.forRoot(),
    BsDropdownModule.forRoot()
  ],
  providers: [
    Title, 
    MovieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
