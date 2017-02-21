import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import {
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapsLatLng,
  CameraPosition,
  GoogleMapsMarkerOptions,
  GoogleMapsMarker,
  Geolocation
} from 'ionic-native';


/*
  Generated class for the Ubicacion page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

@Component({
  selector: 'page-ubicacion',
  templateUrl: 'ubicacion.html'
})
export class Ubicacion {

  constructor(public viewCtrl: ViewController) {
  
  }

  ngAfterViewInit() {
    this.loadMap();
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

    Geolocation.getCurrentPosition().then(pos => {

      let element: HTMLElement = document.getElementById('map');

      latitud = pos.coords.latitude;
      longitud = pos.coords.longitude;
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
        title: "Tu Posicion"
      };

      map.addMarker(markerOptions)
        .then((marker: GoogleMapsMarker) => {
          marker.showInfoWindow();
        });
    });






  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
