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
  negocios: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, af: AngularFire, public alertCtrl: AlertController) {
    this.negocios = af.database.list('/produccion/businessPromo');

  }

  openUbicacion() {
      this.navCtrl.push(Ubicacion);
  }

}