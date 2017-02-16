import { Component } from '@angular/core';
import { ModalController, NavController, NavParams } from 'ionic-angular';
import { Reserva } from '../reserva/reserva';
import {
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapsLatLng,
  CameraPosition,
  GoogleMapsMarkerOptions,
  GoogleMapsMarker
} from 'ionic-native';

/*
  Generated class for the Establecimiento page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-establecimiento',
  templateUrl: 'establecimiento.html'
})
export class Establecimiento {

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
    //this.loadMap()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EstablecimientoPage');
  }

  abrirReserva() {
      let profileModal = this.modalCtrl.create(Reserva);
      profileModal.present();
  }

  loadMap() {

    let latitud = 43.0741904;
    let longitud = -89.3809802;
    // make sure to create following structure in your view.html file
    // and add a height (for example 100%) to it, else the map won't be visible
    // <ion-content>
    //  <div #map id="map" style="height:100%;"></div>
    // </ion-content>

    // create a new map by passing HTMLElement
    let element: HTMLElement = document.getElementById('map');

    let map = new GoogleMap(element);
    // listen to MAP_READY event
    map.one(GoogleMapsEvent.MAP_READY).then(() => console.log('Map is ready!'));

    // create LatLng object
    let ionic: GoogleMapsLatLng = new GoogleMapsLatLng(latitud, longitud);

    // create CameraPosition
    let position: CameraPosition = {
      target: ionic,
      zoom: 18,
      tilt: 30
    };

    // move the map's camera to position
    map.moveCamera(position);

    // create new marker
    let markerOptions: GoogleMapsMarkerOptions = {
      position: ionic,
      title: "Pizza Hut"
    };

    map.addMarker(markerOptions)
      .then((marker: GoogleMapsMarker) => {
        marker.showInfoWindow();
      });

  }
}
