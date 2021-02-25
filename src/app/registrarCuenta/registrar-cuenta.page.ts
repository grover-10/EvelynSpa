import { Component } from '@angular/core';
import {ModalController} from '@ionic/angular';
import {Router} from '@angular/router';
import {modalErrorLoginPage} from '../modals/modalErrorLogin/modalErrorLogin.page'
import { ServiceService } from '../api/service.service';
import { AES256 } from '@ionic-native/aes-256/ngx';

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

  constructor(
    private service: ServiceService,
    private aes256: AES256
  ){}


  encryptarContrasenia(){
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
      "idfacebook":"",
      "publicidad": publicidad
    }

    this.service.registrarUsuario(usuario)
      .then(res =>{
        console.log("usuarios registrado");
        console.log(res);
      })
      .catch(er =>{
        console.log(er);
      });
  }

  verificarDatos(){
    if(this.nombre.length > 0 && this.apellido.length > 0 && this.dni.length > 0 && this.celular.length > 0 && this.correo.length > 0 && this.contrasenia.length > 5){
      this.boton = false;
    }else{
      this.boton = true;
    }
  }

}