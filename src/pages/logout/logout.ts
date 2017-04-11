import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { NavyrPage } from '../navyr/navyr';
import { LoginPage } from '../login/login';
/*
  Generated class for the Logout page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html'
})
export class LogoutPage {

  constructor(public navCtrl: NavController, public authData : AuthService) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LogoutPage');
  }

  returnSesion(){
    this.navCtrl.setRoot(NavyrPage);
  }

  logOut(){
    this.authData.signOut();
    this.navCtrl.setRoot(LoginPage);
  }


}
