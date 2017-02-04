import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { Establecimiento } from '../establecimiento/establecimiento';

@Component({
  selector: 'page-navyr',
  templateUrl: 'navyr.html'
})
export class Navyr {
  establecimiento = Establecimiento;
  constructor(public navCtrl: NavController) {
    
  }


}
