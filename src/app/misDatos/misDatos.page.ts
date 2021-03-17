import { Component } from '@angular/core';
import {ModalController,LoadingController,AlertController,ToastController, NavController, Platform } from '@ionic/angular';
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
    selector: 'app-misDatos',
    templateUrl: 'misDatos.page.html',
    styleUrls: ['./styles/misDatos.page.scss']
})

export class misDatosPage {
  nombre:String="";
  apellido:String="";
  dni:String="";
  celular:String="";
  correo:String="";
  boton:boolean = true;
  usuario;
  public isLoading = false;
  public subscription;

  constructor(
    private service: ServiceService,
    private aes256: AES256,
    public loadingController: LoadingController,
    public alertController: AlertController,
    private navCtrl: NavController,
    private platform: Platform,
    public toastController: ToastController
  ){}


  ionViewWillEnter(): void{
    this.obtenerDatosStorage();
     this.subscription = this.platform.backButton.subscribeWithPriority(9999, () => {
       this.navCtrl.pop();
     });
   }
 
   // Restore to default when leaving this page
   ionViewDidLeave(): void {
     this.subscription.unsubscribe();
   } 
 
  async obtenerDatosStorage(){
    await Storage.get({key:"idusuario"}).then(res =>{
      this.usuario = JSON.parse(res.value);
      console.log(this.usuario);
      this.setearDatos();
      
    })
    .catch(er =>{
      console.log(er);
    });
  }

  setearDatos(){
    this.nombre = this.usuario.nombres;
    this.apellido = this.usuario.apellidos;
    this.dni = this.usuario.dni;
    this.celular = this.usuario.celular;
    this.correo = this.usuario.correo;
  }


  registrarUsuario(){
    this.loadingLogeando();
    var usuario = {
      "idusuario": this.usuario.idusuario,
      "nombres": this.nombre,
      "apellidos":this.apellido,
      "dni":this.dni,
      "celular":this.celular,
      "correo":this.correo
    }

    this.service.actualizarUsuario(usuario)
      .then(res =>{
        console.log("usuarios actualizado");
        console.log(res);
        this.usuario = res[0];
        this.setearDatos();
        this.dismiss();
        this.presentToast();
      })
      .catch(er =>{
        console.log(er);
        this.dismiss();
        this.AlertError();
      });
  }

  verificarDatos(){
    if(this.nombre.length > 0 && this.apellido.length > 0 && this.dni.length > 0 && this.celular.length > 0 && this.correo.length > 0 ){
      this.boton = false;
    }else{
      this.boton = true;
    }
  }

  //////////////// LOADING LOGIN //////////////////
  async loadingLogeando() {
    this.isLoading = true;
    return await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Ingresando...'
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
      message: 'Error al actualizar sus datos, intentelo de nuevo.',
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Sus datos han sido actualizados',
      duration: 2000,
      color: "success"
    });
    toast.present();
  }
}