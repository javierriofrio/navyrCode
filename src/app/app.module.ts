import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { NavyrPage } from '../pages/navyr/navyr';
import { MiCuentaPage } from '../pages/micuenta/micuenta';
import { MisReservasPage } from '../pages/misreservas/misreservas';
import { EstablecimientoPage } from '../pages/establecimiento/establecimiento';
import { CategoriaPage } from '../pages/categoria/categoria';
import { AjustesPage } from '../pages/ajustes/ajustes';
import { NgCalendarModule  } from 'ionic2-calendar';
import { ReservaPage } from '../pages/reserva/reserva';
import { UbicacionPage } from '../pages/ubicacion/ubicacion';
import { FavoritoPage } from '../pages/favorito/favorito';
import { BuscarPage } from '../pages/buscar/buscar';
import { PuntosPage } from '../pages/puntos/puntos';
import { IrcategoriasPage } from '../pages/ircategorias/ircategorias';
import { TerminosPage } from '../pages/terminos/terminos';
import { LoginPage } from '../pages/login/login';
import { LogoutPage } from '../pages/logout/logout';
import { ResetPasswordPage } from '../pages/reset-password/reset-password';
import { SignupPage } from '../pages/signup/signup';
import { AuthService } from '../providers/auth-service';
//import { Facebook } from '@ionic-native/facebook'

// Import the AF2 Module
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

export const firebaseConfig = {
  apiKey: "AIzaSyC0JZwWB0uCsq7Uv7WxAUkIQSJhBRALAM4",
  authDomain: "navyr.firebaseapp.com",
  databaseURL: "https://navyr.firebaseio.com",
  storageBucket: "project-8626609783434337582.appspot.com",
  messagingSenderId: "329734583670"
};

const myFirebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
}

@NgModule({
  declarations: [
    MyApp,
    NavyrPage,
    MiCuentaPage,
    MisReservasPage,
    EstablecimientoPage,
    CategoriaPage,
    AjustesPage,
    ReservaPage,
    UbicacionPage,
    FavoritoPage,
    BuscarPage,
    PuntosPage,
    IrcategoriasPage,
    TerminosPage,
    LoginPage,
    LogoutPage,
    ResetPasswordPage,
    SignupPage
  ],
  imports: [
    NgCalendarModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    NavyrPage,
    MiCuentaPage,
    MisReservasPage,
    EstablecimientoPage,
    CategoriaPage,
    AjustesPage,
    ReservaPage,
    UbicacionPage,
    FavoritoPage,
    BuscarPage,
    PuntosPage,
    IrcategoriasPage,
    TerminosPage,
    LoginPage,
    LogoutPage,
    ResetPasswordPage,
    SignupPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, AuthService]
})
export class AppModule {}
// AF2 Settings

