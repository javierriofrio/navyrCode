import { Component } from '@angular/core';

import { NavController, NavParams, AlertController, ActionSheetController } from 'ionic-angular';
import { Camera } from 'ionic-native';
import { DomSanitizer } from '@angular/platform-browser';
import { NavyrPage } from '../navyr/navyr';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2';
import { AuthService } from '../../providers/auth-service';
import { LoginPage } from '../login/login';
//import localForage from "localforage";
import { FormBuilder, Validators , FormGroup} from '@angular/forms';
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
  private cuentaForm: FormGroup;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private DomSanitizer: DomSanitizer, 
  private database: AngularFireDatabase, public authData: AuthService,public formBuilder: FormBuilder,private alertCtrl: AlertController,
  public actionSheetCtrl: ActionSheetController) {
    this.photoTaken = false;
    this.cuentaForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],      
      cedula: ['', Validators.compose([Validators.minLength(10),Validators.maxLength(10), Validators.required])],
      apellido: ['', Validators.compose([Validators.maxLength(30), Validators.required])],
      nombre: ['', Validators.compose([Validators.maxLength(30), Validators.required])],
      telefono: ['', Validators.compose([Validators.minLength(7), Validators.required])],
      fechaNacimiento: ['', Validators.compose([Validators.required])],
      imagen: ['', Validators.compose([Validators.required])]
    });

   this.authData.auth$.subscribe(user => {
      if (user) {
        database.object(`/development/private/users/${user.uid}`).subscribe(
          snapshot => {
            this.usuario = snapshot
            this.fechaNacimiento = new Date(snapshot.fechaNacimiento).toISOString();
            firebase.storage().ref().child(`imagenes/usuarios/${user.uid}.jpg`).getDownloadURL().then((url) => {
              this.cameraData = url
              const imagen = document.getElementById("fotoUser") as HTMLImageElement;
              imagen.src = url;
            })
    
            

          }
        )
      } else {
        this.cameraData = "assets/img/avatar-img.png";
        this.navCtrl.setRoot(LoginPage);
      }
    });
  }



  tomarFoto(origen) {
    var options = {
      sourceType: origen,
      destinationType: Camera.DestinationType.DATA_URL,
        targetWidth: 1200,
        targetHeight: 1200,
        encodingType: Camera.EncodingType.JPEG,
        allowEdit: true,
    };
    Camera.getPicture(options).then((imageData) => {
      this.cameraData = 'data:image/jpeg;base64,' + imageData;
      this.photoTaken = true;
      this.photoSelected = false;
      //localForage.setItem("photo",this.cameraData);
    }, (err) => {
      // Handle error
    });
  }

  upload(userId:string) {
    let storageRef = firebase.storage().ref();
    
    const imageRef = storageRef.child(`imagenes/usuarios/${userId}.jpg`);

    imageRef.putString(this.cameraData, firebase.storage.StringFormat.DATA_URL).then((snapshot)=> {
     // Do something here when the data is succesfully uploaded!
    });
  }

  public presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Seleccione una imagen',
      buttons: [
        {
          text: 'Seleccinar de la librería',
          handler: () => {
            this.tomarFoto(Camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Usar Cámara',
          handler: () => {
            this.tomarFoto(Camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  

  guardarDatosCuenta(usuarioId){
    //this.database.object(`/development/private/users/${usuarioId}`).set(this.usuario)
    console.log(this.cuentaForm.value);
    this.authData.updateUser(usuarioId, this.clean(this.cuentaForm.value));
    this.upload(usuarioId); 
    this.presentSaveAlert();
  }


  clean(obj) {
    for (var propName in obj) { 
      if (obj[propName] === null || obj[propName] === undefined || obj[propName] === "") {
        delete obj[propName];
      }
    }
    return obj;
  }


  cancelarCuenta(usuarioId) {
    this.presentConfirm(usuarioId);
  }


  presentSaveAlert(){
    let alert = this.alertCtrl.create({
      title: 'Guardar',
      subTitle: 'Se han guardado los datos correctamente!',
      buttons: ['OK']
    });
    alert.present();
  }

  presentConfirm(usuarioId) {
  let alert = this.alertCtrl.create({
    title: 'Cancelar Cuenta',
    message: 'Estas seguro que deseas desactivar la cuenta?',
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Confirmar',
        handler: () => {
          this.authData.updateUser(usuarioId,{habilitado:false});
        }
      }
    ]
  });
  alert.present();
}

  openRootPage() {
	  this.navCtrl.setRoot(NavyrPage);
  }

}
