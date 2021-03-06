import { Component } from '@angular/core';
import { ServiceService } from '../api/service.service';
import { AlertController, Platform ,NavController} from '@ionic/angular';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;

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
  public subscription;
  public idusuario;
  constructor(private service:ServiceService,
    private router:Router,
    private platform: Platform) {}

  ionViewWillEnter(): void{
   this.getDatos();
   this.subscription = this.platform.backButton.subscribeWithPriority(9999, () => {
    this.router.navigate(['tabs/inicio']);
   
  });
  }

  async getDatos(){
    const ret = await Storage.get({ key: 'idusuario' });
    const user = JSON.parse(ret.value);
    this.idusuario = user.idusuario;
    this.cambiarListaCitas();
  }

  // Restore to default when leaving this page
  ionViewDidLeave(): void {
    this.subscription.unsubscribe();
  } 

  cambiarListaCitas(){
    if(this.opcionSeleccionada == "1"){
      this.listaVisible  = [];
      this.getProximasCitas(this.idusuario);
    }else{
      if(this.opcionSeleccionada == "2"){
        this.listaVisible  = [];
        this.getHistorialCitas(this.idusuario);
      }
    }
  }

  convert(input) {
    return moment(input, 'HH:mm:ss').format('h:mm A');
  }

  convertMonth(input) {
    return moment(input, 'YYYY-MM-DD').format('MMM');
  }

  convertDay(input) {
    return moment(input, 'YYYY-MM-DD').format('DD');
  }

  getProximasCitas(data){
      this.service.getListarProximasCitas(data)
      .subscribe(data=>{
            this.listaVisible = data;
            console.log(data);
      },(error)=>{
          console.log(error)
      });
  }

  getHistorialCitas(data){
    this.service.getListarHistorialCitas(data)
    .subscribe(data=>{
      this.listaVisible = data;
          console.log(data);
    },(error)=>{
        console.log(error)
    });
  }

}
