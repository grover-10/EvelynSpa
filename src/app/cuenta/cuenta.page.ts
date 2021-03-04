import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cuenta',
  templateUrl: 'cuenta.page.html',
  styleUrls: ['./styles/cuenta.page.scss']
})

export class cuentaPage{



  constructor(public router:Router){}


  irMisDatos(){
      this.router.navigate(['misDatos']);
  }

  irMiPuntaje(){
      this.router.navigate(['miPuntaje']);
  }

}