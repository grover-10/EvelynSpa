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


  constructor(
    private service: ServiceService,
    private aes256: AES256
  ){}



  registrarUsuario(clave){


    var usuario = {
      "nombres": this.nombre,
      "apellidos":this.apellido,
      "dni":this.dni,
      "celular":this.celular,
      "correo":this.correo,
      "contrasenia":clave,
      "idfacebook":""
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
    if(this.nombre.length > 0 && this.apellido.length > 0 && this.dni.length > 0 && this.celular.length > 0 && this.correo.length > 0 ){
      this.boton = false;
    }else{
      this.boton = true;
    }
  }

}