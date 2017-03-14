import { Component } from '@angular/core';

import { Establecimiento } from '../establecimiento/establecimiento';
import { Categoria } from '../categoria/categoria';
import { NavController, AlertController } from 'ionic-angular';
import { Ubicacion } from '../ubicacion/ubicacion';
import { Buscar } from '../buscar/buscar';
import {AngularFire, FirebaseListObservable} from 'angularfire2';


@Component({
  selector: 'page-navyr',
  templateUrl: 'navyr.html'
})
export class Navyr {
  establecimiento = Establecimiento;
  categoria = Categoria;
  buscar = Buscar;
  promos: FirebaseListObservable<any>;
  categories: FirebaseListObservable<any>;
  business: FirebaseListObservable<any>;
  images : URL[];

  constructor(public navCtrl: NavController, af: AngularFire, public alertCtrl: AlertController) {
    this.promos = af.database.list('/development/private/businessPromo');
    this.categories = af.database.list('/development/catalogs/businessCategories');
    this.business = af.database.list('/development/private/businessImages');
    
  }

  openUbicacion() {
      this.navCtrl.push(Ubicacion);
  }

  openCategoria(categoria) {
      console.log(categoria);
  }

}