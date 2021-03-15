import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Plugins } from '@capacitor/core';
import { AlertController,Platform } from '@ionic/angular';
const { Storage } = Plugins;

@Component({
  selector: 'app-cuenta',
  templateUrl: 'cuenta.page.html',
  styleUrls: ['./styles/cuenta.page.scss']
})

export class cuentaPage{

   public nombreusuario;
   public subscription;

  constructor(public router:Router,
               private platform: Platform,
              private alertController:AlertController){}

 

  ionViewWillEnter(): void{
    this.getDatos();
    this.subscription = this.platform.backButton.subscribeWithPriority(9999, () => {
     this.router.navigate(['tabs/inicio']);
     this.subscription.unsubscribe();
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
    this.nombreusuario = user.nombres;
 
  }

  irMisDatos(){
      this.router.navigate(['misDatos']);
  }

  irMiPuntaje(){
      this.router.navigate(['miPuntaje']);
  }
  cerrarSesion(){
    this.presentAlertConfirm();
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Cerrar Sesión',
      message: '¿Desea cerrar sesión?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Boton no');
          }
        }, {
          text: 'Si',
          handler: () => {
            console.log("Cerrar Sesion");
         
            
          }
        }
      ]
    });

    await alert.present();
  }


}