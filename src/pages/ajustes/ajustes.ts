import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NavyrPage } from '../navyr/navyr';
import { Storage } from '@ionic/storage'

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

  distance: Number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
    storage.ready().then(() => {
       storage.get('distance').then((val) => {
         this.distance = val;
       })
     });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AjustesPage');
  }

  openRootPage() {
	  this.navCtrl.setRoot(NavyrPage);
  }

  guardarAjustes(){
    this.storage.ready().then(()=> {
      this.storage.set("distance",this.distance);
    });
  }

}
