import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import { Camera } from 'ionic-native';
import { DomSanitizer } from '@angular/platform-browser';
import { NavyrPage } from '../navyr/navyr';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2';
import { AuthService } from '../../providers/auth-service';
import { LoginPage } from '../login/login';
import localForage from "localforage";
import { FormBuilder, Validators } from '@angular/forms';
import { EmailValidator } from '../../validators/email';
import * as firebase from 'firebase';

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
  public cuentaForm: any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private DomSanitizer: DomSanitizer, 
  private database: AngularFireDatabase, public authData: AuthService,public formBuilder: FormBuilder,) {
    this.photoTaken = false;
    this.cuentaForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],      
      cedula: ['', Validators.compose([Validators.minLength(10),Validators.maxLength(10), Validators.required])],
      apellido: ['', Validators.compose([Validators.maxLength(30), Validators.required])],
      nombre: ['', Validators.compose([Validators.maxLength(30), Validators.required])],
      telefono: ['', Validators.compose([Validators.minLength(7), Validators.required])],
      nacimiento: ['', Validators.compose([Validators.required])],
      imagen: ['', Validators.compose([Validators.required])]
    });

   this.authData.auth$.subscribe(user => {
      if (user) {
        database.object(`/development/private/users/${user.uid}`).subscribe(
          snapshot => {
            this.usuario = snapshot
            this.fechaNacimiento = new Date(snapshot.fechaNacimiento).toISOString();
            const cameraData = firebase.storage().ref('imagenes/usuarios/').child(user.uid).getDownloadURL;
            

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
    firebase.storage().ref('imagenes/usuarios/').child(usuarioId).
    putString(this.cameraData, 'base64', {contentType: 'image/png'})
    this.database.object(`/development/private/users/${usuarioId}`).set(this.usuario)
  }


  goToRoot() {
    this.navCtrl.setRoot(NavyrPage);
  }

  
  openRootPage() {
	  this.navCtrl.setRoot(NavyrPage);
  }

}
