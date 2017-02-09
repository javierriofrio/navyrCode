import { Component } from '@angular/core';

import { Establecimiento } from '../establecimiento/establecimiento';
import { Categoria } from '../categoria/categoria';
import { ModalController, NavController } from 'ionic-angular';
import { Ubicacion } from '../ubicacion/ubicacion';


@Component({
  selector: 'page-navyr',
  templateUrl: 'navyr.html'
})
export class Navyr {
  establecimiento = Establecimiento;
  categoria = Categoria;
  constructor(public navCtrl: NavController, public modalCtrl: ModalController) {

  }

  openModal() {

    let modal = this.modalCtrl.create(Ubicacion);
    modal.present();
  }

}