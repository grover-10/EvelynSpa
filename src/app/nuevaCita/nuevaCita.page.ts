import { Component, OnInit } from '@angular/core';
import {Router,NavigationExtras} from '@angular/router';
import { ServiceService } from '../api/service.service';
import { AlertController, Platform ,NavController} from '@ionic/angular';
@Component({
  selector: 'app-nuevaCita',
  templateUrl: 'nuevaCita.page.html',
  styleUrls: ['./styles/nuevaCita.page.scss']
})
export class nuevaCitaPage{

  public icon1 =  'chevron-down-outline';
  public icon2 =  'chevron-down-outline';
  public icon3 =  'chevron-down-outline';
  public icon4 =  'chevron-down-outline';
  public icon5 =  'chevron-down-outline';
  public icon6 =  'chevron-down-outline';
  tratamientos:any;
  tiposTratamientos:any;
  ocultarlista = true;
  public lista1 = false;
  public lista2 = false;
  public lista3 = false;
  public lista4 = false;
  public lista5 = false;
  public lista6 = false;

  public listallena1:any = [{nombre:'Tratamiento -60m',idTratamiento:1}];
  public listallena2:any = [{nombre:'Tratamiento -60m',idTratamiento:1}];
  public listallena3:any = [{nombre:'Tratamiento -60m',idTratamiento:1}];
  public listallena4:any = [{nombre:'Tratamiento -60m',idTratamiento:1}];
  public listallena5:any = [{nombre:'Tratamiento -60m',idTratamiento:1}];
  public listallena6:any = [{nombre:'Tratamiento -60m',idTratamiento:1}];


  public nuevacita:any = {};
  public subscription;

  constructor(
    private router:Router,
    private platform: Platform,
    private navCtrl: NavController,
    private apiServicio:ServiceService
    ) {}

    ionViewWillEnter(): void{
      this.listarTiposTratamientos();
      this.subscription = this.platform.backButton.subscribeWithPriority(9999, () => {
       this.navCtrl.pop();
     });
  }

  // Restore to default when leaving this page
  ionViewDidLeave(): void {
    this.subscription.unsubscribe();
  } 

  listarTiposTratamientos(){
    this.apiServicio.listarTiposTratamientos()
    .subscribe((data)=>{
      this.tiposTratamientos = data;
      for(let tipo of this.tiposTratamientos){
        tipo.icono = "chevron-down-outline";
        tipo.seleccionado = false;
      }
      console.log(this.tiposTratamientos);
    },(error)=>{
      console.log(error);
    });
  }

  listarTratamientos(){
    this.apiServicio.listarTratamientos()
      .subscribe((data)=>{
        console.log(data);
        this.tratamientos = data;
      },(error)=>{
        console.log("error al traer tratamientos");
        console.log(error);
      });
  }

  expandir(tipo){
   
    let tipotramiento = this.tiposTratamientos.find(item => item.idtipotratamiento === tipo.idtipotratamiento);
    
    if(tipotramiento.seleccionado == false){
      tipotramiento.icono = "chevron-up-outline";
      tipotramiento.seleccionado = true;
    }else{
      tipotramiento.icono = "chevron-down-outline";
      tipotramiento.seleccionado = false;
    }
  }

  irNuevaCitaHorario(tratamiento){
    
    this.nuevacita.tratamiento = tratamiento;
    console.log(this.nuevacita);

    let navigationExtras: NavigationExtras = {
      state: {
        nuevaCita: this.nuevacita
      }
    };    
    this.router.navigate(['nuevaCitaHorario'],navigationExtras);
  }


  buscarTratamiento(evento){
    console.log(evento.detail.value);
    let valor = evento.detail.value;
    if(valor == ""){
      this.ocultarlista = true;
    }else{
      this.apiServicio.buscarTratamiento(valor)
      .subscribe((data) =>{

        if(data == null){
          this.tratamientos = [{"nombre":"Sin resultados"}];
          this.ocultarlista = false;
        }else{
          this.tratamientos = data;
          this.ocultarlista = false;
        }
        

        console.log(this.tratamientos);
      },(er)=>{
        console.log(er);
      });
    }

   
  }

}
