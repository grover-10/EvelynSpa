import { Component } from '@angular/core';

@Component({
  selector: 'app-misCitas',
  templateUrl: 'misCitas.page.html',
  styleUrls: ['./styles/misCitas.page.scss']
})
export class misCitasPage {


  listaProxCitas = [{"fecha": '13', "mes": "Ene", "modalidad": "Local", "tratamiento": "Depilación de cejas", "hora": "10:00 am"}]
  historial = [{"fecha": '01', "mes": "Feb", "modalidad": "Local", "tratamiento": "Vinoterapia", "hora": "10:00 am"}];

  listaVisible:any;
  opcionSeleccionada = "1";

  constructor() {}

  ionViewWillEnter(): void{

    this.listaVisible = this.listaProxCitas;

  }

  cambiarListaCitas(event){

    if(event.detail.value == "1"){
      this.listaVisible = this.listaProxCitas;
    }else{
      if(event.detail.value == "2"){
        this.listaVisible = this.historial;
      }
    }
  }

}
