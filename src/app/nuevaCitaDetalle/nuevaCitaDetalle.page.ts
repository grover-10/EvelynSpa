import { Component } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import { ModalController,NavController } from '@ionic/angular';
import { data } from 'jquery';
import { ServiceService } from '../api/service.service';
import { Platform } from '@ionic/angular';
import {modalCitaReservadaPage} from '../modals/modalCitaReservada/modalCitaReservada.page';
import * as moment from 'moment';

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
  public subscription;
  constructor(private modalController:ModalController,
    public router: Router,  
    public service: ServiceService,
    private platform: Platform,
    private navCtrl: NavController,
    private route:ActivatedRoute,){

    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
          this.nuevaCita = this.router.getCurrentNavigation().extras.state.nuevaCita;
      }
    });
  }


  ionViewWillEnter(): void{
   
    this.subscription = this.platform.backButton.subscribeWithPriority(9999, () => {
      this.navCtrl.pop();
   });
   }

     // Restore to default when leaving this page
  ionViewDidLeave(): void {
    this.subscription.unsubscribe();
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

  convert(input) {
    return moment(input, 'HH:mm:ss').format('h:mm A');
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
     modal.onDidDismiss()
     .then((data) => {
         const subcategoria = data['data'];
         this.router.navigate(['tabs/misCitas']);
      });
      return await modal.present();
 
   }

}