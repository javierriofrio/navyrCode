import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Ubicacion } from '../ubicacion/ubicacion';
import { Navyr } from '../navyr/navyr';

/*
  Generated class for the Categoria page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-categoria',
  templateUrl: 'categoria.html'
})
export class Categoria {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoriaPage');
  }

    openUbicacion() {
      this.navCtrl.push(Ubicacion);
  }
   
  openRootPage() {
	  this.navCtrl.setRoot(Navyr);
  }

}
