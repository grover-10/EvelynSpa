import { Component } from '@angular/core';
import {Router} from '@angular/router';
import { ModalController } from '@ionic/angular';
import {modalCitaReservadaPage} from '../modals/modalCitaReservada/modalCitaReservada.page';
@Component({
  selector: 'app-nuevaCitaDetalle',
  templateUrl: 'nuevaCitaDetalle.page.html',
  styleUrls: ['./styles/nuevaCitaDetalle.page.scss']
})

export class nuevaCitaDetallePage{

  public icon1 =  'chevron-down-outline';
  public icon2 =  'chevron-down-outline';



  public lista1 = false;
  public lista2 = false;

  constructor(private modalController:ModalController){}
  
  expandirTratamiento(val){

    console.log('HOLA')
    switch(val){

      case 1:
       
        if(this.icon1 === 'chevron-down-outline'){
          this.lista1 = true;
          this.icon1 = 'chevron-up-outline';
        }else{
          this.lista1 = false;
          this.icon1 = 'chevron-down-outline';
        }
        break;

      case 2:
        if(this.icon2 === 'chevron-down-outline'){
          this.lista2 = true;
          this.icon2 = 'chevron-up-outline';
        }else{
          this.lista2 = false;
          this.icon2 = 'chevron-down-outline';
        }
        break;

    }

  }

  registrarCita(){
    this.modalCitaReservada();
  }

  async modalCitaReservada(){
    const modal= await this.modalController.create({
       component: modalCitaReservadaPage,
     });
     await modal.present();
 
   }

}