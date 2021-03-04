import { Component } from '@angular/core';
import {ModalController,AlertController, LoadingController} from '@ionic/angular';
import {Router} from '@angular/router';
import {modalErrorLoginPage} from '../modals/modalErrorLogin/modalErrorLogin.page'
import { ServiceService } from '../api/service.service';
import { AES256 } from '@ionic-native/aes-256/ngx';
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

export interface Slide {
    title: string;
    description: string;
    image: string;
  }

@Component({
    selector: 'app-registrarCuenta',
    templateUrl: 'registrar-cuenta.page.html',
    styleUrls: ['./styles/registrar-cuenta.page.scss']
})

export class RegistrarCuentaPage {
  nombre:String="";
  apellido:String="";
  dni:String="";
  celular:String="";
  correo:String="";
  contrasenia:string="";
  check:String="";
  boton:boolean = true;

  private secureKey: string = "7666733f9a8ce733904a5b8e61f10f17";
  private secureIV: string = "0b89fb94afe731fe";
  public isLoading = false;

  constructor(
    private service: ServiceService,
    public alertController: AlertController,
    public loadingController: LoadingController,
    public router:Router,
    private aes256: AES256
  ){}


  encryptarContrasenia(){
    this.loadingRegistrando();
    this.aes256.encrypt(this.secureKey,this.secureIV,this.contrasenia).then(res =>{
      console.log(res);
      this.registrarUsuario(res);
    })
    .catch(er =>{
      console.log(er);
    });

  }

  registrarUsuario(clave){


    let publicidad = 0;
    if(this.check == "true"){
      publicidad = 1;
    }else{
      publicidad = 0;
    }

    var usuario = {
      "nombres": this.nombre,
      "apellidos":this.apellido,
      "dni":this.dni,
      "celular":this.celular,
      "correo":this.correo,
      "contrasenia":clave,
      "idfacebook":" ",
      "publicidad": publicidad
    }
    
    this.service.registrarUsuario(usuario)
      .then(res =>{
   
        console.log(res);
        if(res == 0){
            this.dismiss();
            this.AlertCorreoExistente();
        }else{
          this.dismiss();
          console.log("usuarios registrado");
          this.guardarStorage(res);
          this.router.navigate(['tabs/inicio']);
        }
      })
      .catch(er =>{
        console.log(er);
        this.dismiss();
        this.AlertErrorLogin();
      });
  }


  verificarDatos(){
    if(this.nombre.length > 0 && this.apellido.length > 0 && this.dni.length > 0 && this.celular.length > 0 && this.correo.length > 0 && this.contrasenia.length > 5){
      this.boton = false;
    }else{
      this.boton = true;
    }
  }

  async guardarStorage(user){
    await Storage.set({key:'usuario',value:user});
  }


  ////////// ALERTS

  async AlertCorreoExistente() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: 'Ya existe un usuario registrado con tu correo electrónico.',
      buttons: ['OK']
    });

    await alert.present();
  }


  //////////////// LOADING LOGIN //////////////////
  async loadingRegistrando() {
    this.isLoading = true;
    return await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Registrando...'
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

  async AlertErrorLogin() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: 'Error al registrar, intente mas tarde.',
      buttons: ['OK']
    });

    await alert.present();
  }

}