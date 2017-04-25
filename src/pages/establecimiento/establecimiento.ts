import { Component } from '@angular/core';
import { ModalController, NavController, NavParams } from 'ionic-angular';
import { ReservaPage } from '../reserva/reserva';
import { NavyrPage } from '../navyr/navyr';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import { LoginPage } from '../login/login';
import { AuthService } from '../../providers/auth-service';

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
  favorite: Object;


  constructor(public modalCtrl: ModalController, public database: AngularFireDatabase, 
  public navParams: NavParams, public navCtrl: NavController, public authData: AuthService) {
    
    this.idEstablecimiento = navParams.get("idEstablecimiento");
    this.database.object('/development/public/business/' + this.idEstablecimiento + '/business').subscribe(snapshot => {
      this.establecimiento = snapshot;
    });;
 
    this.database.object('/development/public/business/' + this.idEstablecimiento + '/businessServices/features').subscribe(snapshot => {
      this.feature = snapshot;
    });;
    this.database.object('/development/public/business/' + this.idEstablecimiento + '/businessAddresses').subscribe(snapshot => {
      this.direccion = snapshot;
    });;
    
    this.galeryBussiness = this.database.list('/development/private/businessImages/' + this.idEstablecimiento + '/galerias');
    this.listSchedules = this.database.list('/development/public/business/' + this.idEstablecimiento + '/businessServices/schedules');
    this.listPayment = this.database.list('/development/public/business/' + this.idEstablecimiento + '/businessServices/paymentForms');
    this.listCatalogServices = this.database.list('/development/shared/catalogs/services');

    if(this.authData.authenticated){
      console.log(this.authData.displayUID());
 //     console.log('/development/private/businessFavorites/' + this.idEstablecimiento + '/' + this.authData.displayUID);
      this.database.object('/development/private/businessFavorites/' + this.idEstablecimiento + '/' + this.authData.displayUID()).subscribe(snapshot => {
        if(snapshot.value)
          this.favorite = snapshot.value;
      })
    }

  }

  getService(service: string) {
    this.database.object('/development/public/business/' + this.idEstablecimiento + '/businessServices/services').subscribe(snapshot => {
      this.servicio = snapshot;
    });;
    return this.servicio;
  }


  getPayment(payment : string){
    
    this.objectPayment = this.database.object('/development/shared/catalogs/paymentForms/'+payment);
    this.objectPayment.subscribe(snapshot => {
      this.paymentName = snapshot['name'];
    });

    return this.paymentName;
  }


  addFavorites(){

  }


  ionViewDidLoad() {
    //this.loadMap()
  }

  abrirReserva() {

    const authObserver = this.authData.auth$.subscribe(user => {
      console.log(user);
      if (user) {
        console.log(user.uid);
          let profileModal = this.modalCtrl.create(ReservaPage);
          profileModal.present();
      } else {
        this.navCtrl.setRoot(LoginPage);
      }
    });

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