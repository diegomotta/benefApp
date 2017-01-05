import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { AddBeneficioPage } from '../pages/add-beneficio/add-beneficio';
import { DetailBeneficioPage } from '../pages/detail-beneficio/detail-beneficio';
import {AngularFireModule} from 'angularfire2';

export const firebaseConfig = {
  apiKey: "AIzaSyDdnolj8xCnkQT0naew7sg7ZOvbVOuzFwI",
    authDomain: "tarjeta-de-beneficios-mol.firebaseapp.com",
    databaseURL: "https://tarjeta-de-beneficios-mol.firebaseio.com",
    storageBucket: "tarjeta-de-beneficios-mol.appspot.com",
    messagingSenderId: "527080117481"
}



@NgModule({
  declarations: [
    MyApp,
    Page1,
    Page2,
    AddBeneficioPage,
    DetailBeneficioPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Page1,
    Page2,
    AddBeneficioPage,
    DetailBeneficioPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
