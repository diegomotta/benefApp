import { Component } from '@angular/core';

import {ModalController,NavController} from 'ionic-angular';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2';


@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html'
})
export class Page1 {
  
  beneficios: FirebaseListObservable<any>;
  constructor(public navCtrl: NavController,public database: AngularFireDatabase,public modalCtrl: ModalController){
  	this.beneficios = database.list('/beneficios');
  }

  // presentModal() {
  //   let modal = this.modalCtrl.create(DetailBeneficioPage);
  //   modal.present();
  // }

  //   navigate(item) {
  //       this.navCtrl.push(DetailBeneficioPage, {item:item});
  //   }


}
