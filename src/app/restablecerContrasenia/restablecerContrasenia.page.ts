import { Component } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {modalErrorLoginPage} from '../modals/modalErrorLogin/modalErrorLogin.page'
import { AES256 } from '@ionic-native/aes-256/ngx';
import {ModalController,AlertController, LoadingController, Platform, NavController} from '@ionic/angular';
import { ServiceService } from '../api/service.service';
export interface Slide {
    title: string;
    description: string;
    image: string;
  }

@Component({
    selector: 'app-restablecerContrasenia',
    templateUrl: 'restablecerContrasenia.page.html',
    styleUrls: ['./styles/restablecerContrasenia.page.scss']
})

export class restablecerContraseniaPage {
correo;
clave;
private secureKey: string = "7666733f9a8ce733904a5b8e61f10f17";
private secureIV: string = "0b89fb94afe731fe";
public isLoading = false;
public subscription;

  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private aes256: AES256,
    public loadingController: LoadingController,
    private platform: Platform,
    private navCtrl: NavController,
    public alertController: AlertController,
    private apiServicio:ServiceService
    ){

  
      this.route.queryParams.subscribe(params => {
        if (this.router.getCurrentNavigation().extras.state) {
          this.correo = this.router.getCurrentNavigation().extras.state.correo;
          console.log(this.correo);
        }
      });

  }

  ionViewWillEnter(): void{
    this.subscription = this.platform.backButton.subscribeWithPriority(9999, () => {
      this.presentAlertCancelarRestContr();
   });
}

// Restore to default when leaving this page
ionViewDidLeave(): void {
  this.subscription.unsubscribe();
} 

  encryptarContrasenia(){
    this.loadingRegistrando();
    this.aes256.encrypt(this.secureKey,this.secureIV,this.clave).then(res =>{
      console.log(res);
      this.cambiarContrasenia(res);
    })
    .catch(er =>{
      console.log(er);
    });

  }

  cambiarContrasenia(contra){
    let usuario = {"correo":this.correo,"contrasenia": contra};
    this.apiServicio.cambiarContrasenia(usuario)
      .then(res =>{
        this.dismiss();
        this.router.navigate(['restablecerContrasenia2']);
        
      })
      .catch(er =>{
        this.dismiss();
        console.log("error");
        this.AlertError();
      })
  }



    //////////////// LOADING LOGIN //////////////////
    async loadingRegistrando() {
      this.isLoading = true;
      return await this.loadingController.create({
        cssClass: 'my-custom-class',
        message: 'Guardando...'
      }).then(a => {
        a.present().then(() => {
          console.log('presented');
          if (!this.isLoading) {
            a.dismiss().then(() => console.log('abort presenting'));
          }
        });
      });
    }
  
    async dismiss() {
      this.isLoading = false;
      return await this.loadingController.dismiss().then(() => console.log('dismissed'));
    }

    async AlertError() {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        message: 'Ocurrio un error intentelo de nuevo',
        buttons: ['OK']
      });
  
      await alert.present();
    }

    async presentAlertCancelarRestContr() {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Cancelar',
        message: '¿Desea cancelar la restauración?',
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
              this.router.navigate(['login']);    
            }
          }
        ]
      });
  
      await alert.present();
    }

}