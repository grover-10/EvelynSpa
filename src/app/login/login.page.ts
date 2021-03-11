
import {ModalController} from '@ionic/angular';
import {Router,NavigationExtras} from '@angular/router';
import {modalErrorLoginPage} from '../modals/modalErrorLogin/modalErrorLogin.page';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ServiceService } from '../api/service.service';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Facebook} from '@ionic-native/facebook/ngx';
import { Plugins } from '@capacitor/core';
import { AES256 } from '@ionic-native/aes-256/ngx';
const { Storage } = Plugins;

export interface Slide {
    title: string;
    description: string;
    image: string;
  }

@Component({
    selector: 'app-login',
    templateUrl: 'login.page.html',
    styleUrls: ['./styles/login.page.scss']
})

export class loginPage implements OnInit{


  public myForm: FormGroup;
  public submitted = false;
  public isLoading = false;

  private secureKey: string = "7666733f9a8ce733904a5b8e61f10f17";
  private secureIV: string = "0b89fb94afe731fe";

  constructor(private router:Router,
              private modalController:ModalController,
              public formBuilder: FormBuilder,
              public service: ServiceService,
              public alertController: AlertController,
              public facebook: Facebook,
              private aes256: AES256,
              public loadingController: LoadingController){

  }

  ngOnInit(){
    this.myForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
 
}


///////// RUTAS ///////////////
  irMenu(){
      this.router.navigate(['tabs/inicio']);
  }

  irRegistrar(){
    this.router.navigate(['registrarCuenta']);
  }

  irOlvidoContrasenia(){
    this.router.navigate(['olvidoContrasenia']);
  }

  irValidarDatosFacebooK(){
    this.router.navigate(['validarDatosFacebook']);
  }
  


   onSubmit() {
    this.submitted = true;
    if (!this.myForm.valid) {
       console.log('Llena todos los datos!')
      return false;
    } else {
      console.log(this.myForm.value)
      this.loadingLogeando();
      this.validarLogin(this.myForm.value);
 
    }
  }

  get errorControl() {
    return this.myForm.controls;
  }

  validarLogin(login){
    let datosLogin = {correo: login.email, contrasenia: login.password};
    this.encryptarContrasenia(datosLogin)
  }

  encryptarContrasenia(datosLogin){
    this.aes256.encrypt(this.secureKey,this.secureIV,datosLogin.contrasenia).then(res =>{
   
      datosLogin.contrasenia = res;
      this.postValidarlogin(datosLogin);

    })
    .catch(er =>{
      console.log(er);
    });

  }

  postValidarlogin(datosLogin){
    this.service.postValidarLogin(datosLogin)
    .then(data =>{

      console.log("retorno api "+JSON.stringify(data));
      
      if(data == 0 || data == 2){
       
        this.dismiss();
        this.modalErrorLogin();
      }else{
        
        this.guardarStorage(data);
        this.dismiss();
        this.router.navigate(['tabs/inicio']);
      }     

    }).catch(er =>{

     console.log(er);
     this.dismiss();
     this.AlertErrorLogin();

    });
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

  async AlertErrorLogin() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: 'Error al iniciar sesión, intente mas tarde.',
      buttons: ['OK']
    });

    await alert.present();
  }

  async modalErrorLogin(){
    const modal= await this.modalController.create({
       component: modalErrorLoginPage,
       cssClass: 'modal-errorLogin',
     });
     await modal.present();
 
   }






   ////////////// LOGIN FACEBOOK //////////////////////////
   Entrarfacebook(){

      this.facebook.login(['public_profile', 'email'])
        .then(res =>{
          console.log(res);
          if(res.status == 'connected'){
            this.obtenerDatosFacebook();
          }else{
            this.alertaErrorConexionFB();
          }
        })
        .catch(er =>{
          console.log(er);
        })
  }

  obtenerDatosFacebook(){
    this.facebook.api('/me?fields=id,email,first_name,last_name',[])
      .then(data =>{
        console.log(data);
        this.guardarUsuario(data);
      })
      .catch(er =>{
        console.log(er);
      })
  }

  guardarUsuario(user){
    var usuario = {
      "nombres": user.first_name,
      "apellidos":user.last_name,
      "dni":"",
      "celular":"",
      "correo":user.email,
      "contrasenia":"",
      "idfacebook":user.id,
      "publicidad":0
    }

    this.service.validarUsuarioFacebook(usuario)
      .then(res =>{
        console.log("usuarios registrado");
        console.log(res);

        if(res == 2){

          let navigationExtras: NavigationExtras = {
            state: {
              usuario: usuario
            }
          };

          this.router.navigate(['validarDatosFacebook'],navigationExtras);

        }else{

          if(res == 3){

            this.AlertCorreoExistente();

          }else{

            this.guardarStorage(res);
            this.router.navigate(['tabs/inicio']);
            
          }
        }

      })
      .catch(er =>{
        console.log(er);
      });
  }

  async guardarStorage(user){
    await Storage.set({key:'idusuario',value:JSON.stringify(user[0])});
  }

  async alertaErrorConexionFB() {
    const alert = await this.alertController.create({
      header: 'Error',
      subHeader: 'Sin Conexión',
      message: 'No se establecio conexión con facebook',
      buttons: ['OK']
    });

    await alert.present();
  }


  async AlertCorreoExistente() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: 'Ya existe un usuario registrado con tu correo electrónico.',
      buttons: ['OK']
    });

    await alert.present();
  }


}