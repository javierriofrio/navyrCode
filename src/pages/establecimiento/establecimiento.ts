import { Component } from '@angular/core';
import { ModalController, NavController, NavParams } from 'ionic-angular';
import { ReservaPage } from '../reserva/reserva';
import { NavyrPage } from '../navyr/navyr';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import { LoginPage } from '../login/login';
import { AuthService } from '../../providers/auth-service';
import { AlertController } from 'ionic-angular';
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
  private establecimientoId;
  private feature: Object;
  private direccion: Direccion;
  private servicio: Boolean;
  public latitude: number;
  public longitude: number;
  listCatalogServices: FirebaseListObservable<any>;
  listPayment: FirebaseListObservable<any>;
  listSchedules: FirebaseListObservable<any>;
  listFavoritos: FirebaseListObservable<any>;
  listReviews: FirebaseListObservable<any>;
  galeryBussiness: FirebaseListObservable<any>;
  paymentName: string;
  favorite: Object;
  rate: number;


  constructor(public modalCtrl: ModalController, public database: AngularFireDatabase,
    public navParams: NavParams, public navCtrl: NavController, public authData: AuthService, public alertCtrl: AlertController) { 

    const hoy = new Date();
    const anio = hoy.getFullYear();
    const mes = hoy.getMonth() + 1;
    const dia = hoy.getDate();
   
    this.idEstablecimiento = navParams.get("idEstablecimiento");
    this.database.list(`development/public/businessRanking/${this.idEstablecimiento}/views`).$ref.ref.child(`${anio}`).child(`${mes}`).update((update)=>{
      //ranking de establecimientos cuando este la parte de la seguridad de datos
    });

    this.listReviews = this.database.list(`development/private/businessReviews/${this.idEstablecimiento}`);

    this.database.object('/development/public/business/' + this.idEstablecimiento + '/business').subscribe(snapshot => {
      this.establecimientoId = snapshot.id;
      this.establecimiento = snapshot;
      this.rate = this.establecimiento['stars'];
      
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

    if (this.authData.authenticated) {
      //     console.log('/development/private/businessFavorites/' + this.idEstablecimiento + '/' + this.authData.displayUID);

      this.listFavoritos = this.database.list('/development/private/businessFavorites/');
      this.database.object('/development/private/businessFavorites/' + this.idEstablecimiento + '/' + this.authData.displayUID()).subscribe(snapshot => {
        if (snapshot.$value)
          this.favorite = snapshot.$value;
      })
    }

  }

  getService(service: string) {
    this.database.object('/development/public/business/' + this.idEstablecimiento + '/businessServices/services').subscribe(snapshot => {
      this.servicio = snapshot;
    });
    return this.servicio;
  }


  getPayment(payment: string) {

    this.objectPayment = this.database.object('/development/shared/catalogs/paymentForms/' + payment);
    this.objectPayment.subscribe(snapshot => {
      this.paymentName = snapshot['name'];
    });

    return this.paymentName;
  }


  ionViewDidLoad() {
    //this.loadMap()
  }

  abrirReserva() {

    this.authData.auth$.subscribe(user => {
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

  onModelChange($event){
    
  }

  guardarQuitarFavorito() {
    if (this.authData.authenticated) {
      const id = this.establecimientoId
      let fav = this.favorite == "false" ? "true" : "false";
      const authId = this.authData.displayUID();
      this.listFavoritos.$ref.ref.child(id).child(authId).set(fav);
      this.showAlert(fav);
   }
   else{
    this.showAlertFav();
   }
  }

  showAlert(favorite) {
    let textoAlert = favorite == "true" ? "agregado" : "eliminado";
    let alert = this.alertCtrl.create({
      title: 'Favoritos',
      subTitle: 'Este establecimiento fue '+textoAlert+' de sus favoritos!',
      buttons: ['OK']
    });
    alert.present();
  }

  showAlertFav() {
    let alert = this.alertCtrl.create({
      title: 'Favoritos',
      subTitle: 'Por favor iniciar sesión para poder agregar a favoritos este establecimiento!',
      buttons: ['OK']
    });
    alert.present();
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