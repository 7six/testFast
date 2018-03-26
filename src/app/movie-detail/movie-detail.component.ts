import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Title }     from '@angular/platform-browser';

import { MovieService } from './../movie.service';

@Component({
	selector: 'app-movie-detail',
	templateUrl: './movie-detail.component.html',
	styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {

	movie: {};

	constructor(
		private route: ActivatedRoute,
		private location: Location,
		private movieService: MovieService,
		private titleService: Title
		) {}

	ngOnInit(): void {
		this.getMovie();
	}

	getMovie() {

		const slug = this.route.snapshot.paramMap.get('slug');
		const movieId = +slug.split(/-(.+)/)[0];

		this.movieService.getMovieById(movieId)
		.subscribe((data) => {
			this.movie = data;
			this.titleService.setTitle('teste FastShop - Filme ' + data.title);
		});
	}

	goBack(): void {
		this.location.back();
	}

}
