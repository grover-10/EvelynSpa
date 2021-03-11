import { Component } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import { ModalController } from '@ionic/angular';
import { data } from 'jquery';
import { ServiceService } from '../api/service.service';
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
  public nuevaCita;
  
  constructor(private modalController:ModalController,
    public router: Router,  
    public service: ServiceService,
    private route:ActivatedRoute,){

    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
          this.nuevaCita = this.router.getCurrentNavigation().extras.state.nuevaCita;
      }
    });
  }
  
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
    console.log(this.nuevaCita);
    this.postRegistrarCita(this.nuevaCita);
    
  }

  postRegistrarCita(data){
    this.service.postRegistrarNuevaCita(data)
    .then(data=>{

      console.log(data);
      this.modalCitaReservada();

    }).catch(error =>{
      console.log(error);
    });
  }

  async modalCitaReservada(){
    const modal= await this.modalController.create({
       component: modalCitaReservadaPage,
     });
     await modal.present();
 
   }

}