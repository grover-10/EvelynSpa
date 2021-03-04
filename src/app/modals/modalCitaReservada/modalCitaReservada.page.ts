import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-modalCitaReservada',
  templateUrl: 'modalCitaReservada.page.html',
  styleUrls: ['./styles/modalCitaReservada.page.scss']
})

export class modalCitaReservadaPage{


  constructor(private modalCtrl: ModalController){}

  irCitas(){
    this.modalCtrl.dismiss();
  }


}