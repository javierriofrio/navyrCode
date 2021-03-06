import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UbicacionPage } from '../ubicacion/ubicacion';
import { NavyrPage } from '../navyr/navyr';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2';
import { EstablecimientoPage } from '../establecimiento/establecimiento';
import { SubCategoriaPage } from '../subcategoria/subcategoria';

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
  public nombreCategoria:string;
  categories: FirebaseListObservable<any>;
  listPromos: FirebaseListObservable<any>;
  tops: FirebaseListObservable<any>;
  importants: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public database: AngularFireDatabase, public navParams: NavParams) {
    this.nombreCategoria = navParams.get("nombre"); 
    this.categories = this.database.list('/development/shared/catalogs/businessCategories/'+this.nombreCategoria);
    console.log(this.nombreCategoria);
    this.listPromos = this.database.list('/development/public/businessPromo');
    //this.categories = this.database.list('/development/catalogs/businessCategories');
    this.tops = this.database.list('/development/public/topBusiness', {
      query: {
          orderByChild: 'businessCategories',
          equalTo: this.nombreCategoria
      }
    });
    this.importants = this.database.list('/development/public/business', {
      query: {
          orderByChild: 'business/category',
          equalTo: this.nombreCategoria
      }
    });

                                                                                           
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


  openEstablecimiento(establecimiento) {
          this.navCtrl.push(EstablecimientoPage, {
            idEstablecimiento: establecimiento,
          });
  }

  openSubCategoria(nombreCategoria) {
          this.navCtrl.push(SubCategoriaPage, {
            nombre: nombreCategoria,
            categoria: this.nombreCategoria
          });
  }


}
