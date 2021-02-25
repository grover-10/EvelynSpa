import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modalErrorLogin',
  templateUrl: 'modalErrorLogin.page.html',
  styleUrls: ['./styles/modalErrorLogin.page.scss']
})

export class modalErrorLoginPage{


  constructor(private modalCtrl: ModalController){}
  intentarNuevamente(){
    this.modalCtrl.dismiss();
  }

}