import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { Navyr } from '../pages/navyr/navyr';
import { MiCuenta } from '../pages/micuenta/micuenta';
import { MisReservas } from '../pages/misreservas/misreservas';
import { Ajustes } from '../pages/ajustes/ajustes';
import { Favorito } from '../pages/favorito/favorito';
import { Buscar } from '../pages/buscar/buscar';
import { Puntos } from '../pages/puntos/puntos';
import { Ircategorias } from '../pages/ircategorias/ircategorias';
import { Terminos } from '../pages/terminos/terminos';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = Navyr;

  pages: Array<{title: string, component: any, icon: string}>;

  pages2: Array<{title: string, component: any, icon: string}>;

  constructor(public platform: Platform) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Mi Cuenta', component: MiCuenta, icon: 'contact' },
      { title: 'Mis Reservas', component: MisReservas, icon: 'calendar' },
      { title: 'Mis Navyr Puntos', component: Puntos, icon: 'ribbon' },
      { title: 'Ir a Categorias', component: Ircategorias, icon: 'folder-open' },
      { title: 'Buscar', component: Buscar, icon: 'search' },
      { title: 'Favoritos', component: Favorito, icon: 'star' },
      { title: 'Compartir App', component: MisReservas, icon: 'share' },
      { title: 'Cerrar Sesión', component: MisReservas, icon: 'log-out' }
    ];

    this.pages2 = [
      { title: 'Ajustes', component: Ajustes, icon: 'settings' },
      { title: 'Términos y Condiciones', component: Ajustes, icon: 'clipboard' },
      { title: 'Contacto', component: MisReservas, icon: 'mail' },
      { title: 'Acerca De', component: MisReservas, icon: 'happy' }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  openRootPage() {
	  this.nav.setRoot(Navyr);
  }
  
}
