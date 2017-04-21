import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NavyrPage } from '../navyr/navyr';
import { EstablecimientoPage } from '../establecimiento/establecimiento';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2';
/*
  Generated class for the Buscar page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-buscar',
  templateUrl: 'buscar.html'
})
export class BuscarPage {
  searchQuery: string = '';
  items: string[];
  establecimiento = EstablecimientoPage
  listEstablecimientos: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private database: AngularFireDatabase) {
    this.listEstablecimientos = this.database.list('/development/public/business');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuscarPage');
  }

  openRootPage() {
    this.navCtrl.setRoot(NavyrPage);
  }


  getItems(ev: any) {

    let val = ev.target.value;
    // Reset items back to all of the items
    if (val && val.trim() != '') {
      
      var list = this.database.list('/development/public/business').map(_items=>_items.filter(_item=>
      _item.business.businessName.toLowerCase().startsWith(val.toLowerCase())));
  }


      list.subscribe(item=>{
       this.listEstablecimientos = item;
        return this.listEstablecimientos;
      })
    
    }

 
    openEstablecimiento(establecimiento) {
          this.navCtrl.push(EstablecimientoPage, {
            idEstablecimiento: establecimiento,
          });
  }
}

