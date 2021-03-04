import { Component } from '@angular/core';
import {ModalController} from '@ionic/angular';
import {Router} from '@angular/router';
import {modalErrorLoginPage} from '../modals/modalErrorLogin/modalErrorLogin.page'
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

  constructor(public router:Router){}

  irIngresarCodigo(){
        this.router.navigate(['ingresarCodigo']);
  }

}