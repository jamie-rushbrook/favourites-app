import { Component, Inject } from '@angular/core';
import { DetailsPage } from '../details/details';
import { NavController,  ToastController} from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})

export class HomePage {
  myTitle: string = '';
  chosenYear: string;
  items: any;
  favoriteItems : any;
  constructor(public toastCtrl: ToastController, public navCtrl: NavController, @Inject('api') private api, @Inject('favorites') private favorites) {
  }

  setTitle(event){
    this.myTitle = event.target.value;
    this.searchMovies(this.myTitle, null);
  }
  ionViewDidLoad(){
    this.favorites.storage.get('allFavorites').then((val) => {
      if (!val) {
        this.favorites.storage.set('allFavorites', []);
      }
    });
  }
  setYear(event){
    this.chosenYear = event.year.text;
    this.searchMovies(this.myTitle, this.chosenYear);
  }

  searchMovies(title, year){
    this.favorites.get().then((val) => {
      if(val){
        this.favoriteItems = val;

        this.api.getMovies(title, year)
          .subscribe(data => {
            if(!data.Search){
              this.presentToast();
            } else{
              data.Search.map(search_obj => {
                this.favoriteItems.map(obj => {
                  search_obj.Title === obj.Title ? search_obj.favorited = true : search_obj.favorited = false;

                  // if(search_obj.Title === obj.Title){
                  //   search_obj.favorited = true;
                  // } else {
                  //   search_obj.favorited = false;
                  // }
                })
              })
              this.items = data.Search;
            }
          })
      }
    })

  }

  viewMovie(movie){

    this.api.getMovieDetails(movie.imdbID)
      .subscribe(data => {
        this.navCtrl.push(DetailsPage, {
          item: data
        });
      })
  }

  addToFavorites(item){
  console.log('favorited item', item);
    this.api.getMovieDetails(item.imdbID)
      .subscribe(data => {
        if(item.favorited) {
          this.favorites.remove(data);
          item.favorited = false;
        }
        else {
          this.favorites.add(data);
          item.favorited = true;
        }
      })
  }

  clearFavorites(){
    this.favorites.clear();
  }

  presentToast(){
    let toast = this.toastCtrl.create({
      message: 'No results fam!',
      duration: 3000,
      position: 'middle'
    });
    toast.present();
  }
}
