

import { CalendarComponent } from 'ionic2-calendar';
import { Component, ViewChild, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { formatDate } from '@angular/common';
import { AlertController, ModalController } from '@ionic/angular';
import { Router, ActivatedRoute,NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-nuevaCitaHorario',
  templateUrl: 'nuevaCitaHorario.page.html',
  styleUrls: ['./styles/nuevaCitaHorario.page.scss']
})

export class nuevaCitaHorarioPage{

  eventSource = [];
  viewTitle: string;

  public horascita:any = [{"hora":"9:00", "estaDisponible":true, "seleccionada":false},
                          {"hora":"10:00", "estaDisponible":true,"seleccionada":false},
                          {"hora":"11:00", "estaDisponible":true,"seleccionada":false},
                          {"hora":"12:00", "estaDisponible":false,"seleccionada":false},
                          {"hora":"14:00", "estaDisponible":true,"seleccionada":false},
                          {"hora":"15:00", "estaDisponible":true,"seleccionada":false},
                          {"hora":"16:00", "estaDisponible":true,"seleccionada":false},
                          {"hora":"17:00", "estaDisponible":true,"seleccionada":false},];
  public fecha;                        
  public hora;
  public modalidad = "1";
  public nuevaCita;
  
  @ViewChild(CalendarComponent) myCal: CalendarComponent;

  calendar = {
    mode: 'month',
    currentDate: new Date(),
  };

  constructor(
    private alertCtrl: AlertController,
    private router:Router,
    private route:ActivatedRoute,
    @Inject(LOCALE_ID) private locale: string,
    private modalCtrl: ModalController
  ) {

    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
          this.nuevaCita = this.router.getCurrentNavigation().extras.state.nuevaCita;
      }
    });


  }

    // Selected date reange and hence title changed
    onViewTitleChanged(title) {
      this.viewTitle = title;
    }

    // Calendar event was clicked
  async onEventSelected(event) {
    // Use Angular date pipe for conversion
    let start = formatDate(event.startTime, 'medium', this.locale);
    let end = formatDate(event.endTime, 'medium', this.locale);
 
    const alert = await this.alertCtrl.create({
      header: event.title,
      subHeader: event.desc,
      message: 'From: ' + start + '<br><br>To: ' + end,
      buttons: ['OK'],
    });
    alert.present();
  }

   // Change current month/week/day
   next() {
    this.myCal.slideNext();
  }
 
  back() {
    this.myCal.slidePrev();
  }

  onCurrentDateChanged = (ev: Date) => {
    const time = this.dateAsYYYYMMDDHHNNSS(ev);
    console.log(time);
    this.fecha = String(time);


};

getHourSelected(){

  let hora = this.horascita.find(item => item.seleccionada === true);

  if(hora != undefined || hora != null)
      this.hora = hora.hora;
  else
      this.hora = '';

  console.log(this.hora);
}

dateAsYYYYMMDDHHNNSS(date): string {
  return date.getFullYear()
            + '-' + this.leftpad(date.getMonth() + 1, 2)
            + '-' + this.leftpad(date.getDate(), 2);
            /*+ ' ' + this.leftpad(date.getHours(), 2)
            + ':' + this.leftpad(date.getMinutes(), 2)
            + ':' + this.leftpad(date.getSeconds(), 2);
            */
}

leftpad(val, resultLength = 2, leftpadChar = '0'): string {
  return (String(leftpadChar).repeat(resultLength)
        + String(val)).slice(String(val).length);
}

llenarDatos(){

}

irNuevaCitaDatos(){

  this.nuevaCita.fecha = this.fecha;
  this.nuevaCita.hora = this.hora+':00';
  this.nuevaCita.modalidad = this.modalidad;

  console.log(this.nuevaCita);
  let navigationExtras: NavigationExtras = {
    state: {
      nuevaCita: this.nuevaCita
    }
  };    

  this.router.navigate(['nuevaCitaDatos'], navigationExtras);
}


}