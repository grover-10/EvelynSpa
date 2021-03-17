import { Component } from '@angular/core';
import {ModalController, Platform} from '@ionic/angular';
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

  public subscription;

  constructor(private router:Router,
    private platform: Platform,){

  }

  ionViewWillEnter(): void{
  
    this.subscription = this.platform.backButton.subscribeWithPriority(9999, () => {
     this.router.navigate(['login']);
   });
}

// Restore to default when leaving this page
ionViewDidLeave(): void {
  this.subscription.unsubscribe();
} 

  irLogin(){
    this.router.navigate(['login']);
  }

}