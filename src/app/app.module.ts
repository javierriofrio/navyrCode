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

// Import the AF2 Module
import { AngularFireModule } from 'angularfire2';

export const firebaseConfig = {
  apiKey: "AIzaSyBwSbg27y-LmEG1wjic37aW2aKL5W0TjhQ",
  authDomain: "navyrtest.firebaseapp.com",
  databaseURL: "https://navyrtest.firebaseio.com",
  storageBucket: "navyrtest.appspot.com",
  messagingSenderId: "1009758447164"
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
    Buscar
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
    Buscar
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
// AF2 Settings

