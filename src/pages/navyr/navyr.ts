import { Component } from '@angular/core';

import { EstablecimientoPage } from '../establecimiento/establecimiento';
import { CategoriaPage } from '../categoria/categoria';
import { NavController, AlertController } from 'ionic-angular';
import { UbicacionPage } from '../ubicacion/ubicacion';
import { BuscarPage } from '../buscar/buscar';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2';


@Component({
  selector: 'page-navyr',
  templateUrl: 'navyr.html'
})
export class NavyrPage {
  establecimiento = EstablecimientoPage;
  categoria = CategoriaPage;
  buscar = BuscarPage;
  promos: FirebaseListObservable<any>;
  categories: FirebaseListObservable<any>;
  tops: FirebaseListObservable<any>;
  importants: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public database: AngularFireDatabase, public alertCtrl: AlertController) {
    this.promos = this.database.list('/development/private/businessPromo');
    this.categories = this.database.list('/development/catalogs/businessCategories');
    this.tops = this.database.list('/development/public/topBusiness');
    this.importants = this.database.list('/development/public/topImportantBusiness');
    
  }

  openUbicacion() {
      this.navCtrl.push(UbicacionPage);
  }

  openCategoria(nombreCategoria) {
          this.navCtrl.push(CategoriaPage, {
            nombre: nombreCategoria,
          });
  }

  openEstablecimiento(establecimiento) {
          this.navCtrl.push(EstablecimientoPage, {
            idEstablecimiento: establecimiento,
          });
  }

}