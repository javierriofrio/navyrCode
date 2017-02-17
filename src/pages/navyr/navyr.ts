import { Component } from '@angular/core';

import { Establecimiento } from '../establecimiento/establecimiento';
import { Categoria } from '../categoria/categoria';
import { NavController } from 'ionic-angular';
import { Ubicacion } from '../ubicacion/ubicacion';
import {AngularFire, FirebaseListObservable} from 'angularfire2';


@Component({
  selector: 'page-navyr',
  templateUrl: 'navyr.html'
})
export class Navyr {
  establecimiento = Establecimiento;
  categoria = Categoria;
  negocio: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, af: AngularFire) {
    this.negocio = af.database.list('/production/public/business');

    //console.log(this.negocio);
  }

  openUbicacion() {
      this.navCtrl.push(Ubicacion);
  }

}