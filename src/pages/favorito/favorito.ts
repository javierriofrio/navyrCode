import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Navyr } from '../navyr/navyr';

/*
  Generated class for the Favorito page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-favorito',
  templateUrl: 'favorito.html'
})
export class Favorito {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavoritoPage');
  }
  
  openRootPage() {
	  this.navCtrl.setRoot(Navyr);
  }

}
