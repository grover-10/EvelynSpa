import { Component } from '@angular/core';
import {ModalController, NavController, Platform} from '@ionic/angular';
import { Router,ActivatedRoute,NavigationExtras } from '@angular/router';
import {modalErrorLoginPage} from '../modals/modalErrorLogin/modalErrorLogin.page'
import { ServiceService } from '../api/service.service';
import { AlertController,LoadingController } from '@ionic/angular';
export interface Slide {
    title: string;
    description: string;
    image: string;
  }

@Component({
    selector: 'app-olvidoContrasenia',
    templateUrl: 'olvidoContrasenia.page.html',
    styleUrls: ['./styles/olvidoContrasenia.page.scss']
})

export class olvidoContraseniaPage {
  correo;
  public isLoading = false;
  public subscription;
  constructor(
    public router:Router,
    public alertController: AlertController,
    private apiServicio:ServiceService,
    private platform: Platform,
    private navCtrl: NavController,
    public loadingController: LoadingController,
    ){}

  ionViewWillEnter(): void{
      this.subscription = this.platform.backButton.subscribeWithPriority(9999, () => {
       this.navCtrl.pop();
     });
  }

  // Restore to default when leaving this page
  ionViewDidLeave(): void {
    this.subscription.unsubscribe();
  } 
  irIngresarCodigo(){
    this.loadingRegistrando();
    let codigo = this.generaCodigo();
    let usuario:any = {correo:this.correo}
    this.apiServicio.validarCorreo(usuario)
      .then((data)=>{
        console.log(data);
        if(Number(data) == 1){
          
          let cuerpo = "<h4>Hola "+this.correo+"</h4><p>Este es el código que necesitas para cambiar tus credenciales de inicio de sesión en Evelyn Spa:</p><h3 style='color:#000'>"+codigo+"</h3><p>Este correo electrónico se genera automáticamente. Por favor, no respondas a él. Si necesitas ayuda adicional, por favor, visita el Soporte de Evelyn Spa.</p>";
          var email = {"email": this.correo,"content": cuerpo,"subject":"Cambio de contraseña Evelyn Spa"}
          this.apiServicio.enviarCorreo(email)
            .then(res =>{

              let navigationExtras: NavigationExtras = {
                state: {
                  correo:this.correo,
                  codigo: codigo
                }
              };
              this.dismiss();
              this.router.navigate(['ingresarCodigo'],navigationExtras);

            })
            .catch(er =>{
              console.log(er);
            });
        }else{
          this.dismiss();
          this.AlertError('El correo ingresado no esta asociado a ninguna cuenta');
        }
      }).catch(error=>{
        this.dismiss();
        console.log(error);
        this.AlertError('Hubo un error con la red intentalo nuevamente');
      });

 

       
  }

  async AlertError(msm) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: msm,
      buttons: ['OK']
    });

    await alert.present();
  }

    generaCodigo() {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < 4; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

  //////////////// LOADING LOGIN //////////////////
  async loadingRegistrando() {
    this.isLoading = true;
    return await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Enviando...'
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


}