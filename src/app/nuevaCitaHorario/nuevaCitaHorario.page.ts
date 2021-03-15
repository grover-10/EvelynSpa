

import { CalendarComponent } from 'ionic2-calendar';
import { Component, ViewChild, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { formatDate } from '@angular/common';
import { AlertController, ModalController,Platform,NavController} from '@ionic/angular';
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
  public botonContinuar = true;
  public dateNow;
  public timeNow;  
  @ViewChild(CalendarComponent) myCal: CalendarComponent;
  public subscription;
  calendar = {
    mode: 'month',
    currentDate: new Date(),
  };

  constructor(
    private alertCtrl: AlertController,
    private router:Router,
    private navCtrl: NavController,
    private platform: Platform,
    private alertController:AlertController,
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

    this.getDateNow();
    this.getTimeNow();
  }

  ionViewWillEnter(): void{
   
    this.subscription = this.platform.backButton.subscribeWithPriority(9999, () => {
      this.navCtrl.pop();
   });
   }
   
     // Restore to default when leaving this page
  ionViewDidLeave(): void {
    this.subscription.unsubscribe();
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
    if(Date.parse(time) < Date.parse(this.dateNow)){
      this.AlertFechaPasada();
      this.calendar = {
        mode: 'month',
        currentDate: new Date(),
      };
    }else{
      console.log(time);
      this.fecha = String(time);
      this.getHorarios();
    }
        

};

getDateNow(){
  var today = new Date();
  this.dateNow = this.dateAsYYYYMMDDHHNNSS(today);
  console.log(this.dateNow);
}

getTimeNow(){
  var today = new Date();
  this.timeNow = this.dateAsHHNNSS(today);
  console.log(this.timeNow);
}

excluirHorasPasadas(){
  for(let hora of this.horascita){
          hora.estaDisponible = this.compareTime(this.timeNow,hora.hora);

  }
  this.getCitasDiaUsuario();
}
compareTime(time1,time2):Boolean{

	var jdt1=Date.parse(this.dateNow+' '+time1);
	var jdt2=Date.parse(this.fecha+' '+time2);
  if (jdt1>jdt2)
  {
      return false;
  }else{
      return true;
  }

}

getDisponibilidadCita(fecha){
   let cita = {fecha:fecha};
   console.log(cita);
   this.service.postDisponibilidadCita(cita)
   .then(data=>{

      let horasDisponibles:any = data;
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
      this.excluirHorasPasadas();
      
   }).catch(error=>{
     console.log(error);
   });
}

getCitasDiaUsuario(){
  let cita = {fecha:this.fecha,usuario:{idusuario:1}};
  this.service.postCitasDia(cita)
  .then(data=>{
    ///// NO SE PERMITE QUE REGISTRE UNA CITA EN LA MISMA HORA Y MISMO DIA
      console.log(data);
      if(data != null || data != undefined){
        let citas:any = data;

          for(let cita of this.horascita){
                for(let cita2 of citas){
                    if(cita.hora === cita2.hora){
                        cita.estaDisponible = false;
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
    console.log(data);
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
      this.botonContinuar = false;
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

dateAsHHNNSS(date): string {
  return  this.leftpad(date.getHours(), 2)
            + ':' + this.leftpad(date.getMinutes(), 2)
            + ':' + this.leftpad(date.getSeconds(), 2);
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


///////// ALERT CONTROLLER

async AlertFechaPasada() {
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    message: '¿Puedes viajar al pasado?',
    buttons: ['OK']
  });

  await alert.present();
}


}