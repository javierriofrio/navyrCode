import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Ubicacion } from '../ubicacion/ubicacion';
import { Navyr } from '../navyr/navyr';
import {AngularFire, FirebaseListObservable} from 'angularfire2';

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
  public nombreCategoria:any;
  categories: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, af: AngularFire, public navParams: NavParams) {
    this.nombreCategoria = navParams.get("nombre"); 
    this.categories = af.database.list('/development/catalogs/businessCategories/'+this.nombreCategoria);
                                                                                           
  }                                                     

  ionViewDidLoad() {
    //console.log('ionViewDidLoad CategoriaPage');
  }

    openUbicacion() {
      this.navCtrl.push(Ubicacion);
  }
   
  openRootPage() {
	  this.navCtrl.setRoot(Navyr);
  }

}
