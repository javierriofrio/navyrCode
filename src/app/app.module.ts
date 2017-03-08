import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Navyr } from '../pages/navyr/navyr';
import { MiCuenta } from '../pages/micuenta/micuenta';
import { MisReservas } from '../pages/misreservas/misreservas';
import { Establecimiento } from '../pages/establecimiento/establecimiento';
import { Categoria } from '../pages/categoria/categoria';
import { Ajustes } from '../pages/ajustes/ajustes';
import { NgCalendarModule  } from 'ionic2-calendar';
import { Reserva } from '../pages/reserva/reserva';
import { Ubicacion } from '../pages/ubicacion/ubicacion';
import { Favorito } from '../pages/favorito/favorito';
import { Buscar } from '../pages/buscar/buscar';
import { Puntos } from '../pages/puntos/puntos';
import { Ircategorias } from '../pages/ircategorias/ircategorias';
import { Terminos } from '../pages/terminos/terminos';

// Import the AF2 Module
import { AngularFireModule } from 'angularfire2';

export const firebaseConfig = {
  apiKey: "AIzaSyC0JZwWB0uCsq7Uv7WxAUkIQSJhBRALAM4",
  authDomain: "navyr.firebaseapp.com",
  databaseURL: "https://navyr.firebaseio.com",
  storageBucket: "project-8626609783434337582.appspot.com",
  messagingSenderId: "329734583670"
};

@NgModule({
  declarations: [
    MyApp,
    Navyr,
    MiCuenta,
    MisReservas,
    Establecimiento,
    Categoria,
    Ajustes,
    Reserva,
    Ubicacion,
    Favorito,
    Buscar,
    Puntos,
    Ircategorias,
    Terminos
  ],
  imports: [
    NgCalendarModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Navyr,
    MiCuenta,
    MisReservas,
    Establecimiento,
    Categoria,
    Ajustes,
    Reserva,
    Ubicacion,
    Favorito,
    Buscar,
    Puntos,
    Ircategorias,
    Terminos
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
// AF2 Settings

