import { Component } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: 'inicio.page.html',
  styleUrls: ['./styles/inicio.page.scss']
})
export class inicioPage {
  
  slideOpts = {
    initialSlide: 1,
    speed: 400
  };
  constructor() {}

  click(){
    console.log('HOla')
  }

}
