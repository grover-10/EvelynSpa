import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-modalCitaReservada',
  templateUrl: 'modalCitaReservada.page.html',
  styleUrls: ['./styles/modalCitaReservada.page.scss']
})

export class modalCitaReservadaPage{


  constructor(private modalCtrl: ModalController,
              private router:Router){}

  irCitas(){
    this.router.navigate(['tabs/misCitas']);
  }


}