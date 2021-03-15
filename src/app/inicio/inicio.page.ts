import { Component,OnInit } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
const { App } = Plugins;
const { Storage } = Plugins;

@Component({
  selector: 'app-inicio',
  templateUrl: 'inicio.page.html',
  styleUrls: ['./styles/inicio.page.scss']
})
export class inicioPage{
  

  public puntos;
  public nombreusuario;
  public subscription;

  slideOpts = {
    initialSlide: 1,
    speed: 400
  };
  constructor(private platform: Platform,
               public router:Router) {}

  ionViewWillEnter(): void{
    this.getDatos();
    this.subscription = this.platform.backButton.subscribeWithPriority(9999, () => {
      App.exitApp();
   });
   }

  // Restore to default when leaving this page
  ionViewDidLeave(): void {
    this.subscription.unsubscribe();
  } 

  async getDatos(){
    const ret = await Storage.get({ key: 'idusuario' });
    const user = JSON.parse(ret.value);
    console.log(user);
    this.puntos = user.puntos;
    this.nombreusuario = String(user.nombres +" "+ user.apellidos);
  }

  click(){
    console.log('HOla')
  }

}
