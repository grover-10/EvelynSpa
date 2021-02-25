import { Component } from '@angular/core';
import {Router} from '@angular/router'

export interface Slide {
    title: string;
    description: string;
    image: string;
  }

@Component({
    selector: 'app-onBoarding',
    templateUrl: 'onBoarding.page.html',
    styleUrls: ['./styles/onBoarding.page.scss']
})

export class onBoardingPage{

    slideOpts = {
        initialSlide: 1,
      };

      slides: Slide[];
      showSkip = true;
      skip = 'Saltar';

      constructor(private router:Router) {      
          
        this.slides = [
        {
          title: '',
          description: 'Puedes agendar tu cita en solo 4 pasos',
          image: 'assets/onboarding/Yoga - Relax.png',
        },
        {
          title: '',
          description: 'Acumula puntos y gana muchos premios',
          image: 'assets/onboarding/Illustration.png',
        },
        {
          title: '',
          description: 'Date un momento de placer, con las mejores profesionales',
          image: 'assets/onboarding/Fashion.png',
        }
      ];}

      startApp(){
        this.router.navigate(['login']);
      }


}