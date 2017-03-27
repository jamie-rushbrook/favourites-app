import {Component, Inject} from '@angular/core';
import { ToastController } from 'ionic-angular';

/*
  Generated class for the Favorites page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',

})
export class FavoritesPage {
  items: any;
  constructor(public toastCtrl: ToastController, @Inject('favorites') private favorites) {}

  ionViewDidEnter() {
    console.log('ionViewDidLoad FavoritesPage');
    this.resetList();
  }

  presentToast(){
    let toast = this.toastCtrl.create({
      message: 'Add some favorites!',
      duration: 3000,
      position: 'middle'
    });
    toast.present();
  }

  removeFavorite(item){
    this.favorites.remove(item).then((val) => {
      this.items = val;
    });
  }

  resetList(){
    this.favorites.get()
      .then((data) => {
       // console.log(data);
        if(data.length <= 0)
          this.presentToast();
        this.items = data.sort(function(a, b){
          a = new Date(a.Released);
          b = new Date(b.Released);
          return a>b ? 1 : 0;
        })

      });
  }
}
