import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Categoria } from '../categoria/categoria';
import {AngularFire, FirebaseListObservable} from 'angularfire2';

/*
  Generated class for the Ircategorias page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-ircategorias',
  templateUrl: 'ircategorias.html'
})
export class Ircategorias {

  categoria = Categoria;
  categories: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, af : AngularFire, public navParams: NavParams) {
    this.categories = af.database.list('/development/catalogs/businessCategories');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IrcategoriasPage');
  }

}
