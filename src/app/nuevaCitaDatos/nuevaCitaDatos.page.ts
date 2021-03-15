import { Component, OnInit, NgZone } from '@angular/core';
import {Router,ActivatedRoute,NavigationExtras } from '@angular/router'
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Platform,NavController } from '@ionic/angular';
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;

declare var google;

@Component({
  selector: 'app-nuevaCitaDatos',
  templateUrl: 'nuevaCitaDatos.page.html',
  styleUrls: ['./styles/nuevaCitaDatos.page.scss']
})

export class nuevaCitaDatosPage implements OnInit{

  myForm: FormGroup;
  submitted = false;
  public nuevaCita;
  public GoogleAutocomplete: any;
  public autocomplete: { input: string; };
  public autocompleteItems: any[];
  public geocoder:any;
  public ubicacion:any = {};
  public paciente:any = {idPaciente:0}
  private idUsuario;
  public subscription;


  constructor( 
    public formBuilder: FormBuilder,
    public router: Router,
    private platform: Platform,
    private navCtrl: NavController,
    private route:ActivatedRoute,
    public zone: NgZone){
    
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.geocoder = new google.maps.Geocoder();
    this.autocomplete = { input: '' };
    this.autocompleteItems = [];

    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
          this.nuevaCita = this.router.getCurrentNavigation().extras.state.nuevaCita;
      }
    });
  }



ngOnInit(){
  this.myForm = this.formBuilder.group({
    nombres: ['', [Validators.required]],
    apellidos: ['', [Validators.required]],
    celular: ['', [Validators.required, Validators.pattern('^[0-9]+$'),Validators.minLength(9)]],
    email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
    direccion: ['', [Validators.required]]
    
  });
 
  this.getDatos();
}

ionViewWillEnter(): void{
   
  this.subscription = this.platform.backButton.subscribeWithPriority(9999, () => {
    this.navCtrl.pop();
 });
 }

  // Restore to default when leaving this page
  ionViewDidLeave(): void {
    this.subscription.unsubscribe();
  } 


async getDatos(){
  const ret = await Storage.get({ key: 'idusuario' });
  const user = JSON.parse(ret.value);
  this.idUsuario = user.idusuario;
  this.myForm.setValue({
    nombres: user.nombres,
    apellidos: user.apellidos,
    celular: user.celular,
    email: user.correo,
    direccion: ''
  });
 
 
}

get errorControl() {
  return this.myForm.controls;
}

SelectSearchResult(item) {
    console.log(item);

    this.myForm.setValue({
      nombres: this.myForm.value.nombres,
      apellidos: this.myForm.value.apellidos,
      celular: this.myForm.value.celular,
      email: this.myForm.value.email,
      direccion: item.description
    });
  
    this.ClearAutocomplete();
    this.geocoder.geocode({'address':item.description}, (results, status) =>{
  
      this.ubicacion.direccion = item.description;
      this.ubicacion.lat = results[0].geometry.location.lat();
      this.ubicacion.lng = results[0].geometry.location.lng();
  
    });

}

ClearAutocomplete(){
  this.autocompleteItems = []
  this.autocomplete.input = ''
}

UpdateSearchResults(event){

  this.autocomplete.input = event;
  if (this.autocomplete.input == '') {
    this.autocompleteItems = [];
    return;
  }
  this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete.input },
  (predictions, status) => {
    this.autocompleteItems = [];
    this.zone.run(() => {
      predictions.forEach((prediction) => {
        this.autocompleteItems.push(prediction);
      });
    });
  });
}

onSubmit() {
  this.submitted = true;
  if (!this.myForm.valid) {
     console.log('Llena todos los datos!')
    return false;
  } else {

    this.nuevaCita.usuario = this.myForm.value;
    this.nuevaCita.usuario.idusuario = this.idUsuario;
    this.nuevaCita.ubicacion = this.ubicacion;
    this.nuevaCita.cantidadpersonas = 1;
    this.nuevaCita.paciente = this.paciente;
    this.nuevaCita.estado = 1;

    console.log(this.nuevaCita)

    let navigationExtras: NavigationExtras = {
      state: {
        nuevaCita: this.nuevaCita
      }
    };    
    
    this.router.navigate(['nuevaCitaDetalle'],navigationExtras);
  }
}
}