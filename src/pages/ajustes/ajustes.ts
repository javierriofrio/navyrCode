import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NavyrPage } from '../navyr/navyr';
import localForage from "localforage";

/*
  Generated class for the Ajustes page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-ajustes',
  templateUrl: 'ajustes.html'
})
export class AjustesPage {

  distance: Object;

  constructor(public navCtrl: NavController, public navParams: NavParams ) {
    
    localForage.getItem("distance").then((result) => {
           this.distance = result ? <Array<Object>> result : [];
        }, (error) => {
            console.log("ERROR: ", error);
        });
       
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AjustesPage');
  }

  openRootPage() {
	  this.navCtrl.setRoot(NavyrPage);
  }

  guardarAjustes(){
      localForage.setItem("distance",this.distance);
    
  }

}
