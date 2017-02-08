import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Navyr } from '../pages/navyr/navyr';
import { MiCuenta } from '../pages/micuenta/micuenta';
import { MisReservas } from '../pages/misreservas/misreservas';
import { Establecimiento } from '../pages/establecimiento/establecimiento';
import { Categoria } from '../pages/categoria/categoria';

@NgModule({
  declarations: [
    MyApp,
    Navyr,
    MiCuenta,
    MisReservas,
    Establecimiento,
    Categoria
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Navyr,
    MiCuenta,
    MisReservas,
    Establecimiento,
    Categoria
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
