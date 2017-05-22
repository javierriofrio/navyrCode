import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import { Camera } from 'ionic-native';
import { DomSanitizer } from '@angular/platform-browser';
import { NavyrPage } from '../navyr/navyr';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2';
import { AuthService } from '../../providers/auth-service';
import { LoginPage } from '../login/login';
import localForage from "localforage";

@Component({
  selector: 'page-micuenta',
  templateUrl: 'micuenta.html'
})
export class MiCuentaPage {
  cameraData: Object;
  photoTaken: boolean;
  cameraUrl: string;
  photoSelected: boolean;
  userData : FirebaseObjectObservable<any>;
  usuario : Object;
  fechaNacimiento: String;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private DomSanitizer: DomSanitizer, 
  private database: AngularFireDatabase, public authData: AuthService) {
    this.photoTaken = false;

   this.authData.auth$.subscribe(user => {
      if (user) {
        database.object(`/development/private/users/${user.uid}`).subscribe(
          snapshot => {
            this.usuario = snapshot
            this.fechaNacimiento = new Date(snapshot.fechaNacimiento).toDateString();
            localForage.getItem("photo").then((result) => {
            this.cameraData = result ? result : 0;

          }, (error) => {
            console.log("ERROR: ", error);
          });
          }
        )
      } else {
        this.navCtrl.setRoot(LoginPage);
      }
    });
  }



  tomarFoto() {
    var options = {
      sourceType: Camera.PictureSourceType.CAMERA,
      destinationType: Camera.DestinationType.DATA_URL
    };
    Camera.getPicture(options).then((imageData) => {
      this.cameraData = 'data:image/jpeg;base64,' + imageData;
      this.photoTaken = true;
      this.photoSelected = false;
      localForage.setItem("photo",this.cameraData);
    }, (err) => {
      // Handle error
    });
  }
  

  guardarDatosCuenta(usuarioId){
    console.log(usuarioId);
    this.database.object(`/development/private/users/${usuarioId}`).set(this.usuario)
  }

  
  openRootPage() {
	  this.navCtrl.setRoot(NavyrPage);
  }

}
