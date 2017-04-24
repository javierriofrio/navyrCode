import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import { Camera } from 'ionic-native';
import {DomSanitizer} from '@angular/platform-browser';
import { NavyrPage } from '../navyr/navyr';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2';
import { AuthService } from '../../providers/auth-service';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-micuenta',
  templateUrl: 'micuenta.html'
})
export class MiCuentaPage {
  cameraData: string;
  photoTaken: boolean;
  cameraUrl: string;
  photoSelected: boolean;
  userData : FirebaseObjectObservable<any>;
  usuario : Object;
  fechaNacimiento: String;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private DomSanitizer: DomSanitizer, 
  private database: AngularFireDatabase, public authData: AuthService) {
    this.photoTaken = false;

    const authObserver = this.authData.auth$.subscribe(user => {
      console.log(user);
      if (user) {
        console.log(user.uid);
        database.object(`/development/private/users/${user.uid}`).subscribe(
          snapshot => {
            this.usuario = snapshot
            this.fechaNacimiento = new Date(snapshot.fechaNacimiento).toISOString();
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
    }, (err) => {
      // Handle error
    });
  }
  
  openRootPage() {
	  this.navCtrl.setRoot(NavyrPage);
  }

}
