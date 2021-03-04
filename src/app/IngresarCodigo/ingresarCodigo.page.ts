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
    selector: 'app-ingresarCodigo',
    templateUrl: 'ingresarCodigo.page.html',
    styleUrls: ['./styles/ingresarCodigo.page.scss']
})

export class ingresarCodigoPage {
  codigo;
  correo;

  constructor(
    private router:Router,
    private route:ActivatedRoute
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

  irLogin(){
    this.router.navigate(['login']);
  }

  enviarCorreo(){
    this.router.navigate(['restablecerContrasenia']);
  }
}