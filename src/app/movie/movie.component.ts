import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
//import { NavigationExtras } from '@angular/router';

import { MovieService } from './../movie.service';
import { Title }     from '@angular/platform-browser';


@Component({
	selector: 'app-movie',
	templateUrl: './movie.component.html',
	styleUrls: ['./movie.component.css']
})
export class MovieComponent{

	page: number = 1;
	movies: string[];
	
	genres: string[];
	selectedGenres: number[] = [];

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private movieService: MovieService,
		private titleService: Title
		) {}


	/**
	 * Inicialização
	 */
	 ngOnInit(): void {

	 	this.titleService.setTitle('teste FastShop - Filmes');


	 	if(+this.route.snapshot.queryParams["page"]){
	 		this.page = +this.route.snapshot.queryParams["page"];
	 	}

	 	this.getMovies();
	 	this.getGenres();
	 }

	/**
	 * Busca filmes de acordo com os parâmetros
	 */
	 getMovies() {
	 	
	 	this.movieService.getMovies(this.page, this.selectedGenres)
	 	.subscribe((data) => {
	 		this.movies = data.results;
	 		this.page = data.page;
	 	});
	 }

	/**
	 * Busca a página anterior
	 */
	 previousPage(){

	 	if(this.page > 1){
	 		this.page -= 1;
	 		this.router.navigate(['/filmes'], { queryParams: { page: this.page } });
	 	}

	 	this.getMovies();
	 }

	/**
	 * Busca a próxima página
	 */
	 nextPage(){

	 	this.page += 1;
	 	this.router.navigate(['/filmes'], { queryParams: { page: this.page } });
	 	this.getMovies();
	 }


	 /**
	 * Busca genêros
	 */
	 getGenres() {
	 	
	 	this.movieService.getGenres()
	 	.subscribe((data) => {
	 		this.genres = data.genres;
	 	});
	 }

	 /**
	  * Seleciona os gêneros
	  */
	  selectGenre(value){

	  	if(value != ""){
	  		this.page = 1;
	 		//this.selectedGenres.push(value);
	 		this.selectedGenres = [value];

	 		this.router.navigate(['/filmes'], { queryParams: { selectedGenres: this.selectedGenres.join() } });
	 		this.getMovies();
	 	}
	 }

	 /**
	  * Transforma string em slug para usar como url amigável
	  */
	  toSlug (str) {

	  	str = str.replace(/^\s+|\s+$/g, '');
	  	str = str.toLowerCase();

	  	var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
	  	var to   = "aaaaeeeeiiiioooouuuunc------";
	  	for (var i=0, l=from.length ; i<l ; i++) {
	  		str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
	  	}

	  	str = str.replace(/[^a-z0-9 -]/g, '')
	  	.replace(/\s+/g, '-') 
	  	.replace(/-+/g, '-'); 

	  	return str;
	  }

	}
