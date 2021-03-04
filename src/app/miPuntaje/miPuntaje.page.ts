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
    selector: 'app-miPuntaje',
    templateUrl: 'miPuntaje.page.html',
    styleUrls: ['./styles/miPuntaje.page.scss']
})

export class miPuntajePage {


  constructor(
    private service: ServiceService
  ){}


}