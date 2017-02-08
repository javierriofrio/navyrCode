import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { Establecimiento } from '../establecimiento/establecimiento';
import { Categoria } from '../categoria/categoria';

@Component({
  selector: 'page-navyr',
  templateUrl: 'navyr.html'
})
export class Navyr {
  establecimiento = Establecimiento;
  categoria = Categoria;
  constructor(public navCtrl: NavController) {
    
  }


}
