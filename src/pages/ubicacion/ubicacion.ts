import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavyrPage } from '../navyr/navyr';
import {
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapsLatLng,
  GoogleMapsMarkerOptions,
  GoogleMapsMarker,
  Geolocation,
  CameraPosition
} from 'ionic-native';
import localForage from "localforage";
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2'


/*
  Generated class for the Ubicacion page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

@Component({
  selector: 'page-ubicacion',
  templateUrl: 'ubicacion.html'
})
export class UbicacionPage {

  distance: Object;
  restaurants: FirebaseListObservable<any>;


  constructor(public navCtrl: NavController, private database: AngularFireDatabase) {


    localForage.getItem("distance").then((result) => {
      this.distance = result ? result : 0;

    }, (error) => {
      console.log("ERROR: ", error);
    });


  }

  ionViewDidLoad() {
     this.loadMap();
  }

  openRootPage() {
    this.navCtrl.setRoot(NavyrPage);
  }

  /*getMarkers() {
    this.http.get('assets/data/markers.json')
    .map((res) => res.json())
    .subscribe(data => {
      this.addMarkersToMap(data);
    });
  }

  addMarkersToMap(markers) {
    for(let marker of markers) {
      const position = new GoogleMapsLatLng(marker.latitude, marker.longitude);
      const dogwalkMarker = new GoogleMapsMarker({position: position, title: marker.title});
      dogwalkMarker(this.map);
    }
  }*/

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

      const element: HTMLElement = document.getElementById('map');

      latitud = pos.coords.latitude;
      longitud = pos.coords.longitude;
      // create LatLng object


      /*this.src = "https://maps.googleapis.com/maps/api/staticmap?maptype=roadmap&size=600x400&center="+latitud+","+longitud+"&zoom=17";
      this.src = this.src + "&markers=color:red%7Clabel:P%7C"+-0.2635297+","+-78.4703351;
      this.src = this.src + "&markers=color:red%7Clabel:P%7C"+-0.1816454+","+-78.47878179999998;
      this.src = this.src + "&key= AIzaSyCbliPMff9MlsOG6zjYvC-najZI0QRK-Y8"
*/
      const ionic: GoogleMapsLatLng = new GoogleMapsLatLng(latitud, longitud);
      const map = new GoogleMap(element, {
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

      // listen to MAP_READY event
      map.on(GoogleMapsEvent.MAP_READY).then(() =>
        this.buscarRestaurantesPosicion(latitud, longitud).forEach(item => {
          const pos: GoogleMapsLatLng = new GoogleMapsLatLng(item.latitude, item.longitude);
          const markerOptions: GoogleMapsMarkerOptions = {
            position: pos,
            title: item.name
          };
          map.addMarker(markerOptions)
            .then((marker: GoogleMapsMarker) => {
              marker.showInfoWindow();
            });
        })
      );

      // create CameraPosition
      let position: CameraPosition = {
        target: ionic,
        zoom: 18,
        tilt: 30
      };

      // move the map's camera to position
      map.moveCamera(position);



      // create new marker
      /*const markerOptions: GoogleMapsMarkerOptions = {
        position: ionic,
        title: "Tu Posicion"
      };

      map.addMarker(markerOptions)
        .then((marker: GoogleMapsMarker) => {
          marker.showInfoWindow();
        });*/



    });


  }



  buscarRestaurantesPosicion = function (latitud, longitud) {
    //const data = this.database;
    let array = [];
    this.database.list('/development/public/businessByLocation/EC/Pichincha/Quito').subscribe(snapshot => {

      snapshot.forEach(element => {

        this.database.object('/development/public/business/' + element.$key).subscribe(snapshot => {
          if (this.getDistanceFromLatLonInKm(latitud, longitud, snapshot.businessAddresses.latitude, snapshot.businessAddresses.longitude) <= this.distance) {
            console.log('entro aqui');
            array.push({
              name: snapshot.business.businessName,
              latitude: snapshot.businessAddresses.latitude,
              longitude: snapshot.businessAddresses.longitude
            });
          }
        })


      })
    })
    return array;
  }

  getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(lat2 - lat1);  // deg2rad below
    var dLon = this.deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
      ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km

    return d;
  }

  deg2rad(deg) {
    return deg * (Math.PI / 180)
  }


}
