import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Api provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Api {
  omdbUrl: string = 'http://www.omdbapi.com/?';
  giantbomb_apikey: string = '72fbba0af2b4aabfee81efd4979a5c5b395ef672';
  giantbomb_url: string = 'http://www.giantbomb.com/api/';
  pagination_limit: number = 100;
  pagination: number = 0;
  offset: any;
  year: number;
  month: number;
  headers: any;
  constructor(public http: Http) {
    console.log('Hello Api Provider');
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Access-Control-Allow-Origin', '*');
    this.offset = function(){return this.pagination_limit * this.pagination;}
  }

  getMovies(title, year = null, type = 'movie') {
    if (!year)
      return this.http.get(`${ this.omdbUrl }s=${ title }&type=${type}`).map(res => res.json());
    else
      return this.http.get(`${ this.omdbUrl }s=${title}&y=${ year }`).map(res => res.json());
  }

  getMovieDetails(id) { return this.http.get(`${this.omdbUrl}i=${id}&plot=full&tomatoes=true`).map(res => res.json()); }

  getGameReleases(){ return this.http.get(`${this.giantbomb_url}games/?api_key=${this.giantbomb_apikey}&format=json&limit=${this.pagination_limit}&filter=expected_release_year:${this.year},expected_release_month:${this.month},platforms:146|145|157&offset=${this.offset()}&sort=original_release_date:asc`, this.headers).map(res => res.json()); }

  getGameDetails(url){ return this.http.get(`${url}?api_key=${this.giantbomb_apikey}&format=json`).map(res => res.json()); }
  getReleaseDate(url){ return this.http.get(`${url}?api_key=${this.giantbomb_apikey}&format=json`).map(res => res.json()); }

}
