import { Component, Inject } from '@angular/core';
import { DetailsPage } from '../details/details';
import { NavController,  ToastController, LoadingController} from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})

export class HomePage {
  myTitle: string = '';
  chosenYear: string;
  items: any;
  favoriteItems : any;
  loader: any;
  constructor(public toastCtrl: ToastController, public navCtrl: NavController, public loadingCtrl: LoadingController, @Inject('api') private api, @Inject('favorites') private favorites) {
  }

  setTitle(event){
    this.myTitle = event.target.value;
    let year =this.chosenYear ? this.chosenYear : null;
    this.searchMovies(this.myTitle, year);
  }
  ionViewDidLoad(){
    this.favorites.storage.get('allFavorites').then((val) => {
      if (!val) {
        this.favorites.storage.set('allFavorites', []);
      }
    });
    this.loader = this.loadingCtrl.create({
      content: 'Loading fam...'
    })
  }
  ionViewDidEnter(){
  console.log('HOME ENTERED');
    if(this.items){
      this.favorites.get().then((val) => {
        this.favoriteItems = val;
        console.log(val);
        this.items.map(search_obj => {
          if(this.favoriteItems.length <= 0){
            search_obj.favorited = false;
          }

          this.favoriteItems.map(obj => { console.log(search_obj, obj); search_obj.imdbID === obj.imdbID ? search_obj.favorited = true : search_obj.favorited = false; })
        })
      });

    }
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
                this.favoriteItems.map(obj => { search_obj.imdbID === obj.imdbID ? search_obj.favorited = true : search_obj.favorited = false; })
              })
              this.items = data.Search;
            }
          })
      }
    })

  }

  viewMovie(movie){
    this.showLoading(true);
    this.api.getMovieDetails(movie.imdbID)
      .subscribe(data => {
        this.showLoading(false);
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
          this.favorites.remove(data).then(() => {
            this.favorites.get().then((data) => {
              this.favoriteItems = data;
            })
          })
          item.favorited = false;
        }
        else {
          this.favorites.add(data).then(() => {
            this.favorites.get().then((data) => {
              console.log('added?', data);
              this.favoriteItems = data;
            })
          })
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

  showLoading(toggle){
    if(toggle === true)
      this.loader.present();
    else{
      this.loader.dismiss();
      this.loader = this.loadingCtrl.create({
        content: 'Loading fam...'
      });
    }
  }

}
