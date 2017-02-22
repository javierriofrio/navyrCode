import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Navyr } from '../navyr/navyr';

/*
  Generated class for the Ajustes page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-ajustes',
  templateUrl: 'ajustes.html'
})
export class Ajustes {
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad AjustesPage');
  }

  openRootPage() {
	  this.navCtrl.setRoot(Navyr);
  }

}
