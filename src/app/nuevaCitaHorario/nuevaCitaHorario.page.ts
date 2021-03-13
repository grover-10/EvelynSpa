

import { CalendarComponent } from 'ionic2-calendar';
import { Component, ViewChild, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { formatDate } from '@angular/common';
import { AlertController, ModalController } from '@ionic/angular';
import { Router, ActivatedRoute,NavigationExtras } from '@angular/router';
import { ServiceService } from '../api/service.service';
import * as moment from 'moment';

@Component({
  selector: 'app-nuevaCitaHorario',
  templateUrl: 'nuevaCitaHorario.page.html',
  styleUrls: ['./styles/nuevaCitaHorario.page.scss']
})

export class nuevaCitaHorarioPage{

  eventSource = [];
  viewTitle: string;

  public horascita:any;
  public fecha;                        
  public horario;
  public modalidad = "1";
  public nuevaCita:any = {};
  
  @ViewChild(CalendarComponent) myCal: CalendarComponent;

  calendar = {
    mode: 'month',
    currentDate: new Date(),
  };

  constructor(
    private alertCtrl: AlertController,
    private router:Router,
    private service:ServiceService,
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
    this.getHorarios();
};

getDisponibilidadCita(fecha){
   let cita = {fecha:fecha};
   console.log(cita);
   this.service.postDisponibilidadCita(cita)
   .then(data=>{

      let horasDisponibles:any = data;
      console.log(data)
      if(data != null || data != undefined){
          for(let hora of this.horascita){
              for(let horaD of horasDisponibles){
                  if(hora.idhorario === horaD.idhorario){
                      if(horaD.disponibilidad > 2){
                          hora.estaDisponible = false;
                      }
                  }
              }
          }
      }
      
   }).catch(error=>{
     console.log(error);
   });
}

getHorarios(){
  this.service.getListarHorarios()
  .subscribe(data=>{
    this.horascita = data;
    for(let hora of this.horascita){
        hora.estaDisponible = true;
        hora.seleccionada = false;
    }
    this.getDisponibilidadCita(this.fecha);
    
  },(error)=>{
    console.log(error);
  });
}

getHourSelected(horaSelec){
      console.log(this.horascita);
      for(let hora of this.horascita){
        if(horaSelec.idhorario !== hora.idhorario || hora.seleccionada == true){
            hora.seleccionada = false;
        }
      }
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

 convert(input) {
  return moment(input, 'HH:mm:ss').format('h:mm A');
}

irNuevaCitaDatos(){

  for(let hora of this.horascita){
      if(hora.seleccionada == true)
          this.horario = hora;
  }

  this.nuevaCita.fecha = this.fecha;
  this.nuevaCita.horario = this.horario;
  this.nuevaCita.hora = this.horario.hora;
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