import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Gamedetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-gamedetails',
  templateUrl: 'gamedetails.html'
})
export class GamedetailsPage {
  selectedItem: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.selectedItem = navParams.get('item');
    console.log(this.selectedItem);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GamedetailsPage');
  }

}
