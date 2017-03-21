import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UbicacionPage } from '../ubicacion/ubicacion';
import { NavyrPage } from '../navyr/navyr';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2';

/*
  Generated class for the Categoria page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-categoria',
  templateUrl: 'categoria.html'
})
export class CategoriaPage {
  public nombreCategoria:any;
  categories: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public database: AngularFireDatabase, public navParams: NavParams) {
    this.nombreCategoria = navParams.get("nombre"); 
    this.categories = this.database.list('/development/catalogs/businessCategories/'+this.nombreCategoria);
                                                                                           
  }                                                     

  ionViewDidLoad() {
    //console.log('ionViewDidLoad CategoriaPage');
  }

    openUbicacion() {
      this.navCtrl.push(UbicacionPage);
  }
   
  openRootPage() {
	  this.navCtrl.setRoot(NavyrPage);
  }

}
