import { Component } from '@angular/core';
import {ModalController} from '@ionic/angular';
import {ActivatedRoute, Router} from '@angular/router';
import {modalErrorLoginPage} from '../modals/modalErrorLogin/modalErrorLogin.page'
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


  constructor(private router:Router,
    
    ){

  

  }


  guardar(){
    this.router.navigate(['restablecerContrasenia2']);
  }

}