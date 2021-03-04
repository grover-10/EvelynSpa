
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

    public myForm: FormGroup;
    public submitted = false;
    public datosFacebook:any;

    constructor( public formBuilder: FormBuilder,
                 public router: Router,
                 public service: ServiceService,
                 public route: ActivatedRoute){

        this.route.queryParams.subscribe(params => {
            if (this.router.getCurrentNavigation().extras.state) {
               this.datosFacebook = this.router.getCurrentNavigation().extras.state.usuario;
                console.log(this.datosFacebook);
            } 
          });

    }

    ngOnInit(){
        this.myForm = this.formBuilder.group({
          email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
          celular: ['', [Validators.required, Validators.pattern('^[0-9]+$'),Validators.minLength(9)]],
          dni: ['', [Validators.required, Validators.minLength(8),Validators.maxLength(8)]],
          checkbox: [false]
        });

        let email = (this.datosFacebook.correo == null || this.datosFacebook.correo == undefined) ? '': this.datosFacebook.correo;
    
        this.myForm.setValue({
          email: email,
          celular: '',
          dni: '',
          checkbox: false
        });
    
  }

  onSubmit() {
    this.submitted = true;
    if (!this.myForm.valid) {
       console.log('Llena todos los datos!')
      return false;
    } else {
    

      this.datosFacebook.email = this.myForm.value.email;
      this.datosFacebook.celular = this.myForm.value.celular;
      this.datosFacebook.dni = this.myForm.value.dni;
      this.datosFacebook.publicidad = (this.myForm.value.checkbox == true) ? 1:0;
      
      console.log(this.datosFacebook);
      this.postRegistrarUsuario(this.datosFacebook);

    }
  }

  postRegistrarUsuario(usuario){
    this.service.registrarUsuario(usuario)
    .then(res =>{

      console.log("usuarios registrado");
      console.log(res);
      this.guardarStorage(res);
      this.router.navigate(['tabs/inicio']);
    })
    .catch(er =>{
      console.log(er);
    });
  }

  async guardarStorage(user){
    await Storage.set({key:'usuario',value:user});
  }

  get errorControl() {
    return this.myForm.controls;
  }
}