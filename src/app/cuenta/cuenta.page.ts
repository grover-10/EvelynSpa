import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;

@Component({
  selector: 'app-cuenta',
  templateUrl: 'cuenta.page.html',
  styleUrls: ['./styles/cuenta.page.scss']
})

export class cuentaPage implements OnInit{

   public nombreusuario;


  constructor(public router:Router){}

  ngOnInit(){
    this.getDatos();
  }

  async getDatos(){
    const ret = await Storage.get({ key: 'idusuario' });
    const user = JSON.parse(ret.value);
    console.log(user);
    this.nombreusuario = user.nombres;
 
  }

  irMisDatos(){
      this.router.navigate(['misDatos']);
  }

  irMiPuntaje(){
      this.router.navigate(['miPuntaje']);
  }

}