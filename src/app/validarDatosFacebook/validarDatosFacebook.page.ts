
import {Router,NavigationExtras,ActivatedRoute} from '@angular/router';
import {modalErrorLoginPage} from '../modals/modalErrorLogin/modalErrorLogin.page';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ServiceService } from '../api/service.service';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;


@Component({
    selector: 'app-validarDatosFacebook',
    templateUrl: 'validarDatosFacebook.page.html',
    styleUrls: ['./styles/validarDatosFacebook.page.scss']
})

export class validarDatosFacebookPage implements OnInit{

    myForm: FormGroup;
    submitted = false;

    datosFacebook;

    constructor( public formBuilder: FormBuilder,
                 public router: Router,
                 public route: ActivatedRoute){

        this.route.queryParams.subscribe(params => {
            if (this.router.getCurrentNavigation().extras.state) {
               this.datosFacebook = this.router.getCurrentNavigation().extras.state.usuario;

            } 
          });

    }

    ngOnInit(){
        this.myForm = this.formBuilder.group({
          email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
          celular: ['', [Validators.required, Validators.pattern('^[0-9]+$'),Validators.minLength(9)]],
          dni: ['', [Validators.required, Validators.minLength(8),Validators.maxLength(8)]],
          checkbox: [false]
        })

        this.myForm.value.email = this.datosFacebook.email;
        this.myForm.value.celular = this.datosFacebook.celular;
        this.myForm.value.dni = this.datosFacebook.dni;

       
  }

  onSubmit() {
    this.submitted = true;
    if (!this.myForm.valid) {
       console.log('Llena todos los datos!')
      return false;
    } else {
      console.log(this.myForm.value)
 
    }
  }

  get errorControl() {
    return this.myForm.controls;
  }
}