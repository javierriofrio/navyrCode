import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NavyrPage } from '../navyr/navyr';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2';
import { EstablecimientoPage } from '../establecimiento/establecimiento'

/*
  Generated class for the Categoria page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-subcategoria',
  templateUrl: 'subcategoria.html'
})
export class SubCategoriaPage {
  public nombreCategoria:string;
  public nombreSubCategoria:string;
  categories: FirebaseListObservable<any>;
  listPromos: FirebaseListObservable<any>;
  tops: FirebaseListObservable<any>;
  importants: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public database: AngularFireDatabase, public navParams: NavParams) {
  this.nombreSubCategoria = navParams.get("nombre");
  this.nombreCategoria = navParams.get("categoria");
    if(this.nombreSubCategoria.trim() === '*Todos'){
      this.importants = this.database.list('/development/public/business', {
        query: {
            orderByChild: 'business/category',
            equalTo: this.nombreCategoria
        }
      });
    }
    else{
      this.importants = this.database.list('/development/public/business', {
        query: {
            orderByChild: 'business/subcategory',
            equalTo: this.nombreSubCategoria
        }
      });
    }
  }                                                     
   
  openRootPage() {
	  this.navCtrl.setRoot(NavyrPage);
  }


  openEstablecimiento(establecimiento) {
          this.navCtrl.push(EstablecimientoPage, {
            idEstablecimiento: establecimiento,
          });
  }


}
