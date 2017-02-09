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
    Ubicacion
  ],
  imports: [
    NgCalendarModule,
    IonicModule.forRoot(MyApp)
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
    Ubicacion
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
