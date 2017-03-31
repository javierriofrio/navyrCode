import { Component } from '@angular/core';
import { ModalController, NavController, NavParams} from 'ionic-angular';
import { ReservaPage } from '../reserva/reserva';
import { NavyrPage } from '../navyr/navyr';
import {
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapsLatLng,
  GoogleMapsMarkerOptions,
  GoogleMapsMarker
} from 'ionic-native';
import {AngularFireDatabase, FirebaseObjectObservable} from 'angularfire2';

import { Establecimiento } from '../../commons/establecimiento';

/*
  Generated class for the Establecimiento page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-establecimiento',
  templateUrl: 'establecimiento.html'
})
export class EstablecimientoPage {
  public idEstablecimiento:any;
  establecimientoData: FirebaseObjectObservable<any>;
  establecimiento : Object;

  constructor(public modalCtrl: ModalController, public database: AngularFireDatabase, public navParams: NavParams, public navCtrl: NavController) {
    this.idEstablecimiento = navParams.get("idEstablecimiento"); 

    alert(this.idEstablecimiento);
    
    this.establecimientoData = this.database.object('/development/public/business/'+this.idEstablecimiento+'/business');
    
    this.establecimientoData.forEach(item => {
        
        this.establecimiento = item.nombre

    });

  }

  /*ionViewDidLoad() {
    this.loadMap()
  }*/

  abrirReserva() {
      let profileModal = this.modalCtrl.create(ReservaPage);
      profileModal.present();
  }

  openRootPage() {
	  this.navCtrl.setRoot(NavyrPage);
  }

// Load map only after view is initialize
ngAfterViewInit() {
 //this.loadMap();
}

loadMap() {
 // make sure to create following structure in your view.html file
 // and add a height (for example 100%) to it, else the map won't be visible
 // <ion-content>
 //  <div #map id="map" style="height:100%;"></div>
 // </ion-content>

 // create a new map by passing HTMLElement
 let element: HTMLElement = document.getElementById('map');

 // create LatLng object
 let ionic: GoogleMapsLatLng = new GoogleMapsLatLng(43.0741904,-89.3809802);
 let map = new GoogleMap(element,{
        'backgroundColor': 'white',
        'controls': {
          'compass': true,
          'myLocationButton': true,
          'indoorPicker': true,
          'zoom': true
        },
        'gestures': {
          'scroll': true,
          'tilt': true,
          'rotate': true,
          'zoom': true
        },
        'camera': {
          'latLng': ionic,
          'tilt': 30,
          'zoom': 15,
          'bearing': 50
        }
      });
 
 // create CameraPosition
/* let position: CameraPosition = {
   target: ionic,
   zoom: 18,
   tilt: 30
 };

 // move the map's camera to position
 map.moveCamera(position);*/

 // create new marker
 let markerOptions: GoogleMapsMarkerOptions = {
   position: ionic,
   title: 'Pizza Hut'
 };

 map.addMarker(markerOptions)
   .then((marker: GoogleMapsMarker) => {
      marker.showInfoWindow();
    });


 // listen to MAP_READY event
 map.one(GoogleMapsEvent.MAP_READY).then(() => console.log('Map is ready!'));
 }



}