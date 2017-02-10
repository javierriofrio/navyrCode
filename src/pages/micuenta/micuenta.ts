import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import { Camera } from 'ionic-native';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'page-micuenta',
  templateUrl: 'micuenta.html'
})
export class MiCuenta {
  cameraData: string;
  photoTaken: boolean;
  cameraUrl: string;
  photoSelected: boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams, private DomSanitizer: DomSanitizer) {
    this.photoTaken = false;
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

}
