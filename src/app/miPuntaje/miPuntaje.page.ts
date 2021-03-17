import { Component } from '@angular/core';
import {Platform,NavController} from '@ionic/angular';
import { ServiceService } from '../api/service.service';
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;
export interface Slide {
    title: string;
    description: string;
    image: string;
  }

@Component({
    selector: 'app-miPuntaje',
    templateUrl: 'miPuntaje.page.html',
    styleUrls: ['./styles/miPuntaje.page.scss']
})


export class miPuntajePage {

  public subscription;
  public listaPuntos:any;
  public puntajeTotal = 0;
  public idusuario;

  constructor(
    private service: ServiceService,
    private navCtrl: NavController,
    private platform: Platform,
  ){}

  ionViewWillEnter(): void{
    this.getDatos();
    this.subscription = this.platform.backButton.subscribeWithPriority(9999, () => {
      this.navCtrl.pop();
    });
  }

  // Restore to default when leaving this page
  ionViewDidLeave(): void {
    this.subscription.unsubscribe();
  } 

  async getDatos(){
    const ret = await Storage.get({ key: 'idusuario' });
    const user = JSON.parse(ret.value);
    this.getListarPuntos(user.idusuario);
  }

  getListarPuntos(data){
    this.service.getListarPuntos(data)
    .subscribe(data=>{

      console.log(data);
      this.listaPuntos = data;
      this.countPuntaje();
      
    },(error)=>{
      console.log(error);
    });
  }


  countPuntaje(){

    for(let item of this.listaPuntos){
        this.puntajeTotal += item.puntos;
    }
  }
}