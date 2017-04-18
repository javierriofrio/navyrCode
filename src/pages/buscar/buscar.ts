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
      this.listEstablecimientos = this.database.list('/development/public/business', {
        query: {
          orderByChild: 'name',
          equalTo: val.toLowerCase()
        }
      }
      );
    }

    // set val to the value of the searchbar


    // if the value is an empty string don't filter the items

    //this.listEstablecimientos = this.listEstablecimientos.map(listEstablecimientos => {
    // const filtered = 


    //filter((item) => {
    //return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
    //})
    //}
  }
}

