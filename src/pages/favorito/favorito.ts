import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NavyrPage } from '../navyr/navyr';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2';
import { AuthService } from '../../providers/auth-service';
import { EstablecimientoPage } from '../establecimiento/establecimiento';

/*
  Generated class for the Favorito page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-favorito',
  templateUrl: 'favorito.html'
})
export class FavoritoPage {

  listFavoritos: FirebaseListObservable<any>;
  listEstablecimientos: Array<any> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public database: AngularFireDatabase, public authData: AuthService) {
    this.listFavoritos = this.database.list('/development/private/businessFavorites/', {
      query: {
        orderByChild: this.authData.displayUID(),
        equalTo: 'true'
      }
    });

    this.listFavoritos.subscribe(snapshot=>{
      snapshot.forEach(element => {
        this.obtenerEstablecimiento(element.$key).subscribe(snapshot=>{
          this.listEstablecimientos.push({
            'businessName':snapshot.businessName,
            'key': element.$key,
            'logoUrl':snapshot.logoUrl
          });
        });
        
      });
    });
  }

  ionViewDidLoad() {
  }

  openEstablecimiento(establecimiento) {
          this.navCtrl.push(EstablecimientoPage, {
            idEstablecimiento: establecimiento,
          });
  }

  
  obtenerEstablecimiento(idEstablecimiento){
    return this.database.object('/development/public/business/'+idEstablecimiento+'/business/');
  }

  openRootPage() {
    this.navCtrl.setRoot(NavyrPage);
  }

}
