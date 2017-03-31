import { Component } from '@angular/core';
import { ModalController, NavController, NavParams } from 'ionic-angular';
import { ReservaPage } from '../reserva/reserva';
import { NavyrPage } from '../navyr/navyr';
import {
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapsLatLng,
  GoogleMapsMarkerOptions,
  GoogleMapsMarker
} from 'ionic-native';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';

//commons
import { Direccion } from '../../commons/direccion';


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
  public idEstablecimiento: any;
  establecimientoData: FirebaseObjectObservable<any>;

  objectService: FirebaseObjectObservable<any>;
  objectFeatures: FirebaseObjectObservable<any>;
  objectDireccion: FirebaseObjectObservable<any>;
  objectPayment: FirebaseObjectObservable<any>;
  private establecimiento: Object;
  private feature: Object;
  private direccion: Direccion;
  private servicio: Boolean;
  public latitude: number;
  public longitude: number;
  listCatalogServices: FirebaseListObservable<any>;
  listPayment: FirebaseListObservable<any>;
  listSchedules: FirebaseListObservable<any>;
  galeryBussiness: FirebaseListObservable<any>;
  paymentName: string;


  constructor(public modalCtrl: ModalController, public database: AngularFireDatabase, public navParams: NavParams, public navCtrl: NavController) {
    this.idEstablecimiento = navParams.get("idEstablecimiento");

    this.establecimientoData = this.database.object('/development/public/business/' + this.idEstablecimiento + '/business');
    this.objectService = this.database.object('/development/public/business/' + this.idEstablecimiento + '/businessServices/services');
    this.objectFeatures = this.database.object('/development/public/business/' + this.idEstablecimiento + '/businessServices/features');
    this.objectDireccion = this.database.object('/development/public/business/' + this.idEstablecimiento + '/businessAddresses');
    

    this.galeryBussiness = this.database.list('/development/private/businessImages/' + this.idEstablecimiento + '/galerias');
    this.listSchedules = this.database.list('/development/public/business/' + this.idEstablecimiento + '/businessServices/schedules');
    this.listPayment = this.database.list('/development/public/business/' + this.idEstablecimiento + '/businessServices/paymentForms');
    this.listCatalogServices = this.database.list('/development/shared/catalogs/services');

  }

  getService(service: string) {
    this.objectService.subscribe(snapshot => {
      this.servicio = snapshot[service];
    });
    return this.servicio;
  }


  getDireccion() {
    this.objectDireccion.subscribe(snapshot => {
      this.direccion = snapshot;
    });
    return this.direccion;
  }

  getEstablecimientoData() {
    this.establecimientoData.subscribe(snapshot => {
      this.establecimiento = snapshot;
    });
    return this.establecimiento;

  }


  getFeature() {
    this.objectFeatures.subscribe(snapshot => {
      this.feature = snapshot;
    });
    return this.feature;
  }


  getPayment(payment : string){
    
    this.objectPayment = this.database.object('/development/shared/catalogs/paymentForms/'+payment);
    this.objectPayment.subscribe(snapshot => {
      this.paymentName = snapshot['name'];
    });

    return this.paymentName;
  }


  ionViewDidLoad() {
    //this.loadMap()
  }

  abrirReserva() {
    let profileModal = this.modalCtrl.create(ReservaPage);
    profileModal.present();
  }

  openRootPage() {
    this.navCtrl.setRoot(NavyrPage);
  }

  generateArray(obj) {
    return Object.keys(obj).map((key) => { return obj[key] });
  }

  // Load map only after view is initialize
  ngAfterViewInit() {
    //this.loadMap();
  }

  /*getPaymentMethod(paymentId:string){
    this.payment = this.database.object('/shared/catalogs/paymentForms/'+paymentId);
  }*/

  loadMap() {
    // make sure to create following structure in your view.html file
    // and add a height (for example 100%) to it, else the map won't be visible
    // <ion-content>
    //  <div #map id="map" style="height:100%;"></div>
    // </ion-content>

    // create a new map by passing HTMLElement
    let element: HTMLElement = document.getElementById('map');

    // create LatLng object
    let ionic: GoogleMapsLatLng = new GoogleMapsLatLng(this.latitude, this.longitude);
    let map = new GoogleMap(element, {
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