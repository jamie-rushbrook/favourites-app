import { Component, Inject} from '@angular/core';
import { GamedetailsPage } from '../gamedetails/gamedetails';

import { NavController, LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  items: any;
  loader: any;
  loadedItems: any;
  release: string;
  platform: string;
  pagination: 0;
  totalResults: 0;
  year: number;
  offset: 0;
  releaseArray: any;
  exclusive : boolean;
  monthQuery : string;
  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, @Inject('api') private api, @Inject('favorites') private favorites) {
    this.offset = this.api.offset();
    this.api.year = "2017";
    this.api.month = '1';
    let noOfMonths = [];
    for(let i = (new Date().getMonth() + 1); i <= 12; i++){
      noOfMonths.push(i);
    }

    this.monthQuery = noOfMonths.join().replace(/,/g, "|");
  }

  ionViewDidLoad(){
    this.loader = this.loadingCtrl.create({
      content: 'Loading fam...'
    })
  }

  ionViewDidEnter() {
   // if(!this.items){
   //   this.showLoading(true);
   //   console.log(this.year);
   //   this.api.getGameReleases(this.year)
   //     .subscribe(data => {
   //       console.log(data);
   //       this.showLoading(false);
   //       this.totalResults = data.number_of_total_results;
   //       this.loadedItems = data.results;
   //     })
   // }
  }

   viewGame(game){
     this.showLoading(true);
     this.api.getGameDetails(game.api_detail_url)
       .subscribe(data => {
         this.showLoading(false);
         console.log('game details data', data);
         this.navCtrl.push(GamedetailsPage, {
           item: data.results
         });
       })
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

  changePlatforms(platform){

    this.platform = platform;
  }
  changeReleasedGames(release){
    this.release = release;
  }
  changeYear(year){
    this.api.year = year;
    this.api.month = this.api.year === new Date().getFullYear().toString() ? this.monthQuery : '1';
    console.log(this.api.year, this.api.month);
  }

  isExclusive(e){
    this.exclusive = e;
  }
  getGames(){
    console.log(this.platform, this.release);
    this.showItems(this.platform, this.release);
  }
  showItems(platform, release){
    let filteredArray = this.loadedItems
      .filter((element) => {
        if (element.platforms) {
          //console.log("IS EXCLUSIVE? ", this.exclusive, element.platforms.length, element.platforms[0].abbreviation);
          if(this.exclusive){
            if(element.platforms.length === 1 && element.platforms[0].abbreviation === platform){
              return element;
            }
          } else {
            return element.platforms.some((subElement) => {
              return subElement.abbreviation === platform;
            })
          }
        }
      });
    console.log('unfiltered', filteredArray);

    if(release === 'upcoming'){
      console.log('upcoming games');
      this.releaseArray = filteredArray.filter((element) => {
        return element.expected_release_year;
      });
      console.log(this.releaseArray);
      this.releaseArray.map((date) => {
        if(date.expected_release_day){
          date.release_date = new Date(date.expected_release_year + '-' + date.expected_release_month + '-' + date.expected_release_day)
        } else {
          date.expected_date = "Expected " + (date.expected_release_month ? date.expected_release_month : '') + ' ' + date.expected_release_year;
          console.log(date.expected_date);
        }
      });

      this.orderItems();
      console.log(this.releaseArray);
      // this.releaseArray.map((date) => {
      //  // console.log(date);
      //   if(date.expected_release_day){
      //
      //     console.log(new Date(date.expected_release_year + '-' + date.expected_release_month + '-' + date.expected_release_day));
      //
      //   }
      // })

    } else if (release ==='released'){
      console.log('released games');
      this.releaseArray = filteredArray.filter((element) => {
        return element.original_release_date !== null;
      })
      this.releaseArray.map((date) => {
        date.release_date = new Date(date.original_release_date);
      });
      this.orderItems();
    }
  }

  orderItems(){
    this.items = this.releaseArray.sort(function(a, b){
      a = new Date(a.release_date);
      b = new Date(b.release_date);
      return a - b;
    })
  }
  getNextGames(){
    this.api.pagination++;
    this.fetchGameData();
  }
  getPrevGames(){
    this.api.pagination--;
    this.fetchGameData();
  }

  fetchGameData(){
    if(this.release === 'released') this.api.month = '1';
    this.showLoading(true);
    this.api.getGameReleases()
      .subscribe(data => {
        console.log(data);
        this.showLoading(false);
        this.totalResults = data.number_of_total_results;
        this.loadedItems = data.results;
        this.offset = this.api.offset();
        this.pagination = this.api.pagination;
        this.getGames();
        console.log(this.offset, this.totalResults);
      })
  }

  // addToFavorites(item){
  //   console.log('favorited item', item);
  //   this.api.getMovieDetails(item.imdbID)
  //     .subscribe(data => {
  //       if(item.favorited) {
  //         this.favorites.remove(data).then(() => {
  //           this.favorites.get().then((data) => {
  //             this.favoriteItems = data;
  //           })
  //         })
  //         item.favorited = false;
  //       }
  //       else {
  //         this.favorites.add(data).then(() => {
  //           this.favorites.get().then((data) => {
  //             console.log('added?', data);
  //             this.favoriteItems = data;
  //           })
  //         })
  //         item.favorited = true;
  //
  //       }
  //     })
  // }

  resetGameData(){
    this.pagination = 0;
    this.fetchGameData();
  }
}
