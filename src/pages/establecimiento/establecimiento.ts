import { Component } from '@angular/core';
import { ModalController, NavController, NavParams } from 'ionic-angular';
import { ReservaPage } from '../reserva/reserva';
import { NavyrPage } from '../navyr/navyr';
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


}