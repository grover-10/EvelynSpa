import { Component, ViewChild } from '@angular/core';
import {ModalController} from '@ionic/angular';
import {ActivatedRoute, Router,NavigationExtras} from '@angular/router';
import {modalErrorLoginPage} from '../modals/modalErrorLogin/modalErrorLogin.page'
import { AlertController } from '@ionic/angular';
import { ServiceService } from '../api/service.service';
export interface Slide {
    title: string;
    description: string;
    image: string;
  }

@Component({
    selector: 'app-ingresarCodigo',
    templateUrl: 'ingresarCodigo.page.html',
    styleUrls: ['./styles/ingresarCodigo.page.scss']
})

export class ingresarCodigoPage {
  codigo;
  correo;
  code1;
  code2;
  code3;
  code4;

  @ViewChild('input1') input1 : any;
  @ViewChild('input2') input2 : any;
  @ViewChild('input3') input3 : any;
  @ViewChild('input4') input4 : any;

  constructor(
    private router:Router,
    public alertController: AlertController,
    private route:ActivatedRoute,
    private apiServicio:ServiceService
    ){

    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.codigo = this.router.getCurrentNavigation().extras.state.codigo;
        this.correo = this.router.getCurrentNavigation().extras.state.correo;
        console.log(this.codigo);
        console.log(this.correo);
      }
    });

  }

  ionViewWillEnter(){
    this.focusInput1();
  }
  
  compararCodigo(){
    let code = this.code1+this.code2+this.code3+this.code4;
    console.log(String(code).toUpperCase());
    if(this.codigo == String(code).toUpperCase()){

      let navigationExtras: NavigationExtras = {
        state: {
          correo:this.correo,
        }
      };
      this.router.navigate(['restablecerContrasenia'],navigationExtras);
    }else{
      this.AlertError();
    }
  }

  irLogin(){
    this.router.navigate(['login']);
  }

  focusInput1(): void {
    if(String(this.code1).length == 1){
      this.focusInput2();
    }else{
      setTimeout(() => {
        this.input1.setFocus();
      }, 100);
    }
  }

  focusInput2(): void {
    if(String(this.code2).length == 1){
      this.focusInput3();
    }else{
      setTimeout(() => {
        this.input2.setFocus();
      }, 100);
    }
  }

  focusInput3(): void {
    if(String(this.code3).length == 1){
      this.focusInput4();
    }else{
      setTimeout(() => {
        this.input3.setFocus();
      }, 100);
    }
  }

  focusInput4(): void {
    if(String(this.code4).length == 1){
      this.compararCodigo();
    }else{
      setTimeout(() => {
        this.input4.setFocus();
      }, 100);
    }
  }

  async AlertError() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: 'Codigo incorrecto intentelo de nuevo',
      buttons: ['OK']
    });

    await alert.present();
  }



  enviarCodigo(){
    let cod = this.generaCodigo();
    
          let cuerpo = "<h4>Hola "+this.correo+"</h4><p>Este es el código que necesitas para cambiar tus credenciales de inicio de sesión en Evelyn Spa:</p><h3 style='color:#000'>"+cod+"</h3><p>Este correo electrónico se genera automáticamente. Por favor, no respondas a él. Si necesitas ayuda adicional, por favor, visita el Soporte de Evelyn Spa.</p>";
          var email = {"email": this.correo,"content": cuerpo,"subject":"Cambio de contraseña Evelyn Spa"}
          this.apiServicio.enviarCorreo(email)
            .then(res =>{

              this.codigo = cod;
              this.alertaCorreoEnviado();

            })
            .catch(er =>{
              this.AlertErrorEnviar();
            });

       
  }
  async AlertErrorEnviar() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: 'Ocurrio un problema al enviar el correo',
      buttons: ['OK']
    });

    await alert.present();
  }

  async alertaCorreoEnviado() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: 'Su codigo de recuperación a sido enviado',
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
}