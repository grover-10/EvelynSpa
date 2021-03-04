import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-nuevaCita',
  templateUrl: 'nuevaCita.page.html',
  styleUrls: ['./styles/nuevaCita.page.scss']
})
export class nuevaCitaPage {

  public icon1 =  'chevron-down-outline';
  public icon2 =  'chevron-down-outline';
  public icon3 =  'chevron-down-outline';
  public icon4 =  'chevron-down-outline';
  public icon5 =  'chevron-down-outline';
  public icon6 =  'chevron-down-outline';


  public lista1 = false;
  public lista2 = false;
  public lista3 = false;
  public lista4 = false;
  public lista5 = false;
  public lista6 = false;
  

  constructor(private router:Router) {}


 
  expandirTratamiento(val){

    console.log('HOLA')
    switch(val){

      case 1:
       
        if(this.icon1 === 'chevron-down-outline'){
          this.lista1 = true;
          this.icon1 = 'chevron-up-outline';
        }else{
          this.lista1 = false;
          this.icon1 = 'chevron-down-outline';
        }
        break;

      case 2:
        if(this.icon2 === 'chevron-down-outline'){
          this.lista2 = true;
          this.icon2 = 'chevron-up-outline';
        }else{
          this.lista2 = false;
          this.icon2 = 'chevron-down-outline';
        }
        break;
      
      case 3:
        if(this.icon3 === 'chevron-down-outline'){
          this.lista3 = true;
          this.icon3 = 'chevron-up-outline';
        }else{
          this.lista3 = false;
          this.icon3 = 'chevron-down-outline';
        }
        break;

      case 4:
        if(this.icon4 === 'chevron-down-outline'){
          this.lista4 = true;
          this.icon4 = 'chevron-up-outline';
        }else{
          this.lista4 = false;
          this.icon4 = 'chevron-down-outline';
        }
        break;

      case 5:
        if(this.icon5 === 'chevron-down-outline'){
          this.lista5 = true;
          this.icon5 = 'chevron-up-outline';
        }else{
          this.lista5 = false;
          this.icon5 = 'chevron-down-outline';
        }
        break;

      case 6:
        if(this.icon6 === 'chevron-down-outline'){
          this.lista6 = true;
          this.icon6 = 'chevron-up-outline';
        }else{
          this.lista6 = false;
          this.icon6 = 'chevron-down-outline';
        }
        break;

    }

  }

  irNuevaCitaHorario(){
    
    this.router.navigate(['nuevaCitaHorario']);
  }

}
