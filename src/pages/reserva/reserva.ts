import { Component } from '@angular/core';
import { Platform, ViewController, NavParams, NavController} from 'ionic-angular';
import { FormBuilder, Validators , FormGroup} from '@angular/forms';
import { ValidarReserva } from '../validar-reserva/validar-reserva'

/*
  Generated class for the Reserva page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-reserva',
  templateUrl: 'reserva.html'
})
export class ReservaPage {


  private reservaForm: FormGroup;

  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    public formBuilder: FormBuilder
  ) {
    this.reservaForm = formBuilder.group({
      lugar: ['', Validators.compose([Validators.required])],      
      tipo: ['', Validators.compose([Validators.required])],
      noPersonas: ['', Validators.compose([Validators.required])],
      descripcion: ['', Validators.compose([Validators.required])],
      fecha: ['', Validators.compose([Validators.required])],
      hora: ['', Validators.compose([Validators.required])]
    });
  }


  guardarDatosReserva(){
    console.log(this.reservaForm.value)
    this.navCtrl.push(ValidarReserva);
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }
}
