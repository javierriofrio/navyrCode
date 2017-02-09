import { Component } from '@angular/core';
import { NavController, Platform, ViewController, NavParams } from 'ionic-angular';

/*
  Generated class for the Reserva page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-reserva',
  templateUrl: 'reserva.html'
})
export class Reserva {

  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController
  ) {
  }
}
