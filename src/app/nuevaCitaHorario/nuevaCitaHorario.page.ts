

import { CalendarComponent } from 'ionic2-calendar';
import { Component, ViewChild, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { formatDate } from '@angular/common';
import { AlertController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nuevaCitaHorario',
  templateUrl: 'nuevaCitaHorario.page.html',
  styleUrls: ['./styles/nuevaCitaHorario.page.scss']
})

export class nuevaCitaHorarioPage{

  eventSource = [];
  viewTitle: string;
  
  @ViewChild(CalendarComponent) myCal: CalendarComponent;

  calendar = {
    mode: 'month',
    currentDate: new Date(),
  };

  constructor(
    private alertCtrl: AlertController,
    private router:Router,
    @Inject(LOCALE_ID) private locale: string,
    private modalCtrl: ModalController
  ) {}

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


};

dateAsYYYYMMDDHHNNSS(date): string {
  return date.getFullYear()
            + '-' + this.leftpad(date.getMonth() + 1, 2)
            + '-' + this.leftpad(date.getDate(), 2)
            + ' ' + this.leftpad(date.getHours(), 2)
            + ':' + this.leftpad(date.getMinutes(), 2)
            + ':' + this.leftpad(date.getSeconds(), 2);
}

leftpad(val, resultLength = 2, leftpadChar = '0'): string {
  return (String(leftpadChar).repeat(resultLength)
        + String(val)).slice(String(val).length);
}


irNuevaCitaDatos(){
  this.router.navigate(['nuevaCitaDatos']);
}

}