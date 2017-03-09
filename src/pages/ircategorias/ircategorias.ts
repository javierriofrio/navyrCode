import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Categoria } from '../categoria/categoria';

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
<<<<<<< HEAD

=======
>>>>>>> 71f1de4abf00d9e803c83fd886a581436ef190c5
  categoria = Categoria;
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad IrcategoriasPage');
  }

}
