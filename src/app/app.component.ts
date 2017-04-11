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


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;

  usuario : Object;

  pages: Array<{ title: string, component: any, icon: string }>;

  pages2: Array<{ title: string, component: any, icon: string }>;

  constructor(public platform: Platform, public authData: AuthService,) {
    this.initializeApp();
    this.pages = [
              { title: 'Inicio', component: NavyrPage, icon: 'home' },
              { title: 'Mi Cuenta', component: MiCuentaPage, icon: 'contact' },
              { title: 'Mis Reservas', component: MisReservasPage, icon: 'calendar' },
              { title: 'Mis Navyr Puntos', component: PuntosPage, icon: 'ribbon' },
              { title: 'Ir a Categorias', component: IrcategoriasPage, icon: 'folder-open' },
              { title: 'Buscar', component: BuscarPage, icon: 'search' },
              { title: 'Favoritos', component: FavoritoPage, icon: 'star' },
              { title: 'Cerrar Sesión', component: LogoutPage, icon: 'log-out' }
            ];

    const authObserver = this.authData.auth$.subscribe(user => {
     // console.log(user);
      if (user) {
        //this.usuario = user;
        this.rootPage = NavyrPage;
        authObserver.unsubscribe();
      } else {
        /*this.pages = [
          { title: 'Inicio', component: NavyrPage, icon: 'home' },
          { title: 'Ir a Categorias', component: IrcategoriasPage, icon: 'folder-open' },
          { title: 'Buscar', component: BuscarPage, icon: 'search' },
          { title: 'Favoritos', component: FavoritoPage, icon: 'star' },
          { title: 'Crear Cuenta', component: SignupPage, icon: 'person-add' },
          { title: 'Iniciar Sesión', component: LoginPage, icon: 'log-in' }
        ];*/
        this.rootPage = LoginPage;
        authObserver.unsubscribe();
      }
    });

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

  logOut(){
    this.authData.signOut();
    this.openRootPage();
  }

}
