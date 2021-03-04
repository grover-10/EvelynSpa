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
    selector: 'app-restablecerContrasenia2',
    templateUrl: 'restablecerContrasenia2.page.html',
    styleUrls: ['./styles/restablecerContrasenia2.page.scss']
})

export class restablecerContrasenia2Page {

  constructor(private router:Router){

  }


  irLogin(){
    this.router.navigate(['login']);
  }

}