import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CategoriaPage } from '../categoria/categoria';
import { EstablecimientoPage } from '../establecimiento/establecimiento';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2';

/*
  Generated class for the Ircategorias page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-ircategorias',
  templateUrl: 'ircategorias.html'
})
export class IrcategoriasPage {

  //categoria = CategoriaPage;
  categories: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, database : AngularFireDatabase, public navParams: NavParams) {
    this.categories = database.list('/development/shared/catalogs/businessCategories');
  }


  openCategoria(nombreCategoria:string) {
          this.navCtrl.push(CategoriaPage, {
            nombre: nombreCategoria,
          });
  }

  openEstablecimiento(establecimiento:string) {
          this.navCtrl.push(EstablecimientoPage, {
            idEstablecimiento: establecimiento,
          });
  }

}
