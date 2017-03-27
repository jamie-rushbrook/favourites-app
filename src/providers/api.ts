import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Api provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Api {
  omdbUrl: string = 'http://www.omdbapi.com/?'

  constructor(public http: Http) {
    console.log('Hello Api Provider');
  }

  getMovies(title, year = null, type = 'movie') {
    if (!year)
      return this.http.get(`${ this.omdbUrl }s=${ title }&type=${type}`).map(res => res.json());
    else
      return this.http.get(`${ this.omdbUrl }s=${title}&y=${ year }`).map(res => res.json());


  }
  getMovieDetails(id) { console.log(`${this.omdbUrl}i=${id}&plot=full&tomatoes=true`);
    return this.http.get(`${this.omdbUrl}i=${id}&plot=full&tomatoes=true`).map(res => res.json()); }

}
