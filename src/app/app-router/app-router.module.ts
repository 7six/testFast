import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MovieComponent } from './../movie/movie.component';
import { MovieDetailComponent } from './../movie-detail/movie-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/filmes', pathMatch: 'full' },
  { path: 'filmes', component: MovieComponent},
  { path: 'filme/:slug', component: MovieDetailComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRouterModule {}
