import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { MoviesInterface } from './movie/movie.model';
import { MovieInterface } from './movie-detail/movie-detail.model';
import { GenresInterface } from './movie/genres.model';

@Injectable()
export class MovieService {

	providerLanguage: string = "pt-BR";
	providerApiKey: string = "3e7ea37ec04b28cf91d3105dd5e2e681";
	providerUrl: string = "https://api.themoviedb.org/3";

	constructor(private http: HttpClient) {}

	/**
	 * Busca os filmes
	 */
	getMovies(page, genres){
		let resource = "/discover/movie";	
		return this.http.get<MoviesInterface>(`${this.providerUrl + resource}?
			api_key=${this.providerApiKey}&
			page=${page}&
			language=${this.providerLanguage}&
			include_adult=false
			${(genres)? '&with_genres=' + genres.join(): ''}`);
	}

	/**
	 * Busca um filme pelo ID
	 */
	getMovieById(movieId: number){
		let resource = "/movie/" + movieId;	
		return this.http.get<MovieInterface>(`${this.providerUrl + resource}?
			api_key=${this.providerApiKey}&
			&language=${this.providerLanguage}`);
	}

	/**
	 * Busca os Gêneros
	 */
	getGenres(){
		let resource = "/genre/movie/list";	
		return this.http.get<GenresInterface>(`${this.providerUrl + resource}?
			api_key=${this.providerApiKey}&
			language=${this.providerLanguage}`);
	}

}
