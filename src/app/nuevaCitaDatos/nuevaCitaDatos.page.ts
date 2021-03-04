import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { from } from 'rxjs';


@Component({
  selector: 'app-nuevaCitaDatos',
  templateUrl: 'nuevaCitaDatos.page.html',
  styleUrls: ['./styles/nuevaCitaDatos.page.scss']
})

export class nuevaCitaDatosPage implements OnInit{

  myForm: FormGroup;
  submitted = false;

  constructor( public formBuilder: FormBuilder, public router: Router){}



ngOnInit(){
  this.myForm = this.formBuilder.group({
    nombres: ['', [Validators.required]],
    apellidos: ['', [Validators.required]],
    celular: ['', [Validators.required, Validators.pattern('^[0-9]+$'),Validators.minLength(9)]],
    email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
    direccion: ['', [Validators.required]]
    
  })
 
}

get errorControl() {
  return this.myForm.controls;
}

onSubmit() {
  this.submitted = true;
  if (!this.myForm.valid) {
     console.log('Llena todos los datos!')
    return false;
  } else {
    console.log(this.myForm.value)
    this.router.navigate(['nuevaCitaDetalle']);


  }
}
}