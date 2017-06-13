import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { NavyrPage } from '../pages/navyr/navyr';
import { MiCuentaPage } from '../pages/micuenta/micuenta';
import { MisReservasPage } from '../pages/misreservas/misreservas';
import { AjustesPage } from '../pages/ajustes/ajustes';
import { FavoritoPage } from '../pages/favorito/favorito';
import { BuscarPage } from '../pages/buscar/buscar';
import { PuntosPage } from '../pages/puntos/puntos';
import { IrcategoriasPage } from '../pages/ircategorias/ircategorias';
import { TerminosPage } from '../pages/terminos/terminos';
import { LoginPage } from '../pages/login/login';
import { LogoutPage } from '../pages/logout/logout';
import { AuthService } from '../providers/auth-service';
import * as firebase from 'firebase';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = NavyrPage;

  usuario: Object;
  cameraData: string;

  pages: Array<{ title: string, component: any, icon: string, id: string }>;

  pages2: Array<{ title: string, component: any, icon: string }>;

  constructor(public platform: Platform, public authData: AuthService) {
    this.initializeApp();


    this.pages = [
      { title: 'Inicio', component: NavyrPage, icon: 'home', id: 'inicio' },
      { title: 'Mi Cuenta', component: MiCuentaPage, icon: 'contact', id: 'cuenta' },
      { title: 'Mis Reservas', component: MisReservasPage, icon: 'calendar', id: 'reservas' },
      { title: 'Mis Navyr Puntos', component: PuntosPage, icon: 'ribbon', id: 'nav-puntos' },
      { title: 'Ir a Categorias', component: IrcategoriasPage, icon: 'folder-open', id: 'categorias' },
      { title: 'Buscar', component: BuscarPage, icon: 'search', id: 'buscar' },
      { title: 'Favoritos', component: FavoritoPage, icon: 'star', id: 'favoritos' },
      { title: 'Iniciar Sesión', component: LoginPage, icon: 'log-in', id: 'sesion-in' },
      { title: 'Cerrar Sesión', component: LogoutPage, icon: 'log-out', id: 'sesion-out' }
    ];


    // used for an example of ngFor and navigation

    this.pages2 = [
      { title: 'Ajustes', component: AjustesPage, icon: 'settings' },
      { title: 'Términos y Condiciones', component: TerminosPage, icon: 'clipboard' },
      { title: 'Compartir App', component: MisReservasPage, icon: 'share' },
      { title: 'Contacto', component: MisReservasPage, icon: 'mail' },
      { title: 'Acerca De', component: MisReservasPage, icon: 'happy' }
    ];


  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
      if (!this.authData.authenticated) {
        document.getElementById('sesion-out').style.display = 'none';
        document.getElementById('cuenta').style.display = 'none';
        document.getElementById('puntos').style.display = 'none';
        document.getElementById('nav-puntos').style.display = 'none';
        document.getElementById('favoritos').style.display = 'none';
        document.getElementById('reservas').style.display = 'none';
        this.authData.auth$.subscribe(user => {
            if (user) {
              firebase.storage().ref().child(`imagenes/usuarios/${user.uid}.jpg`).getDownloadURL().then((url) => {
              const imagen = document.getElementById("fotoUser") as HTMLImageElement;
              imagen.src = url;
              });
            }
          });
      }
      else {
        const imagen = document.getElementById("fotoUser") as HTMLImageElement;
        imagen.src = "assets/img/avatar-img.png";
        document.getElementById('sesion-in').style.display = 'none';
      }
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  openRootPage() {
    this.nav.setRoot(NavyrPage);
  }

  logOut() {
    this.authData.signOut();
    this.openRootPage();
  }

}
