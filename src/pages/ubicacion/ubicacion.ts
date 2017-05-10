import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavyrPage } from '../navyr/navyr';
import {
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapsLatLng,
  GoogleMapsMarkerOptions,
  GoogleMapsMarker,
  Geolocation
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
  
  constructor( public navCtrl: NavController, private database: AngularFireDatabase) {
    localForage.getItem("distance").then((result) => {
           this.distance = result ? <Array<Object>> result : [];
           console.log(this.distance);
        }, (error) => {
            console.log("ERROR: ", error);
        });
    
    this.restaurants = this.database.list('/development/public/businessByLocation/EC/Pichincha/Quito');
  }
  
  openRootPage() {
	  this.navCtrl.setRoot(NavyrPage);
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
      // create LatLng object

      this.buscarRestaurantesPosicion(latitud,longitud);
      let ionic: GoogleMapsLatLng = new GoogleMapsLatLng(latitud, longitud);
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

      // listen to MAP_READY event
      map.one(GoogleMapsEvent.MAP_READY).then(() => console.log('Map is ready!'));

      // create CameraPosition
 /*     let position: CameraPosition = {
        target: ionic,
        zoom: 18,
        tilt: 30
      };

      // move the map's camera to position
      map.moveCamera(position);
*/
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
  
  buscarRestaurantesPosicion(latitud,longitud){
    
    const data = this.database;

    let array = [];
    
    this.restaurants.subscribe(snapshot=>{
      snapshot.forEach(element => {

        const infoRestaurantes = data.object('/development/public/business/'+element.$key)
        

        infoRestaurantes.subscribe(snapshot=>{
          if(this.getDistanceFromLatLonInKm(latitud,longitud,snapshot.businessAddresses.latitude,snapshot.businessAddresses.longitude)<this.distance){
            array.push(snapshot.business.businessName);
          }

          /*.map(_items => _items.filter((_item){
            if (this.getDistanceFromLatLonInKm(_item.latitude,_item.longitude,latitud,longitud) < this.distance)
              return snapshot;
          } ));*/
        })

    })
    
  });

console.log(array);     

  }

  getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
    var dLon = this.deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    console.log(d);
    return d;
   }

   deg2rad(deg) {
    return deg * (Math.PI/180)
   }


}
