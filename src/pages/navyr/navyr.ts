import { Component } from '@angular/core';

import { Establecimiento } from '../establecimiento/establecimiento';
import { Categoria } from '../categoria/categoria';
import { NavController, AlertController } from 'ionic-angular';
import { Ubicacion } from '../ubicacion/ubicacion';
import { Buscar } from '../buscar/buscar';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import * as firebase from 'firebase'


@Component({
  selector: 'page-navyr',
  templateUrl: 'navyr.html'
})
export class Navyr {
  establecimiento = Establecimiento;
  categoria = Categoria;
  buscar = Buscar;
  negocios: FirebaseListObservable<any>;
  images : string[];

  constructor(public navCtrl: NavController, af: AngularFire, public alertCtrl: AlertController) {
    this.negocios = af.database.list('/produccion/businessPromo');
    const storageRef = firebase.storage().ref().child('imagenes/promociones/-Kb2E5bH8_Bn7Ro8yjZD');
    storageRef.getDownloadURL().then(url => this.images = url);

    console.log(this.images);
  }

  openUbicacion() {
      this.navCtrl.push(Ubicacion);
  }

}