import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Plugins } from '@capacitor/core';
import { AlertController,Platform } from '@ionic/angular';
const { Storage } = Plugins;
import { Facebook} from '@ionic-native/facebook/ngx';

@Component({
  selector: 'app-cuenta',
  templateUrl: 'cuenta.page.html',
  styleUrls: ['./styles/cuenta.page.scss']
})

export class cuentaPage{

   public nombreusuario;
   public subscription;
   public usuario;
  constructor(public router:Router,
               private platform: Platform,
               private facebook: Facebook,
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
    this.usuario = user;
    this.nombreusuario = user.nombres;
 
  }

  irMisDatos(){
      this.router.navigate(['misDatos']);
  }

  irMiPuntaje(){
      this.router.navigate(['miPuntaje']);
  }

  cerrarSesion(){
    if(this.usuario.idfacebook == " " || this.usuario.idfacebook==""){
     Storage.remove({key:"idusuario"})
      .then(res =>{
        this.guardarSesion(2);
        this.router.navigate(['login']);
      })
      .catch(er =>{
        console.log("error");
      });
      
    }else{
      this.facebook.logout().then(res =>{
        Storage.remove({key:"idusuario"})
          .then(res =>{
            this.guardarSesion(2);
            this.router.navigate(['login']);
          })
          .catch(er =>{
            console.log("error");
          });
      })
      .catch(er =>{
        console.log("error al cerrar sesion facebook");
      });
    }
  }

  async guardarSesion(sesion){
    console.log(sesion);
    await Storage.set({key:'sesion',value: JSON.stringify({
      indicador: sesion,
    })});
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
            this.cerrarSesion();
            
          }
        }
      ]
    });

    await alert.present();
  }


}