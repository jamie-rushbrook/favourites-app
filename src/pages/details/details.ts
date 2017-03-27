import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
/*
  Generated class for the Details page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-details',
  templateUrl: 'details.html'
})
export class DetailsPage {
  selectedItem: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private iab: InAppBrowser) {

    this.selectedItem = navParams.get('item');
    console.log(this.selectedItem);
    console.log(new Date(this.selectedItem.Released));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailsPage');
  }

  openURL(url){
    this.iab.create(url);
  }
}
