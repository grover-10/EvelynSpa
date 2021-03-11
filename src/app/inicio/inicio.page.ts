import { Component,OnInit } from '@angular/core';
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;

@Component({
  selector: 'app-inicio',
  templateUrl: 'inicio.page.html',
  styleUrls: ['./styles/inicio.page.scss']
})
export class inicioPage implements OnInit{
  

  public puntos;
  public nombreusuario;

  slideOpts = {
    initialSlide: 1,
    speed: 400
  };
  constructor() {}


  ngOnInit(){
    this.getDatos();
  }

  async getDatos(){
    const ret = await Storage.get({ key: 'idusuario' });
    const user = JSON.parse(ret.value);
    console.log(user);
    this.puntos = user.puntos;
    this.nombreusuario = String(user.nombres +" "+ user.apellidos);
  }

  click(){
    console.log('HOla')
  }

}
