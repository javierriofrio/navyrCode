import { Component } from '@angular/core';
import { NavController, NavParams ,AlertController } from 'ionic-angular';
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
  ciudad: String = "Quito";

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController) {
    
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
      this.presentSaveAlert();
  }

  presentSaveAlert(){
    let alert = this.alertCtrl.create({
      title: 'Guardar',
      subTitle: 'Se han guardado los datos correctamente!',
      buttons: ['OK']
    });
    alert.present();
  }

}
