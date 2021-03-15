import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private options: any ={ headers: new HttpHeaders({'Content-Type': 'application/json',})};
  url = 'https://bube.com.pe/evelynspa/api';
  url2 = 'http://localhost:8080/api';
  url3 = 'https://evelynspaperu.com:8080/evelynspa/api'

  

  constructor(public http: HttpClient) { }


  postValidarLogin(data){
    return new Promise((resolve, reject) => {
      this.http.post(this.url+'/usuario/login',data,this.options)
      .subscribe(Response => {
        resolve(Response);
      }, (error) => {
        reject(error);
      });
    });
  }

  // REGISTRAR USUARIOS
  registrarUsuario(usuario){
    return new Promise((resolve , reject ) =>{
      this.http.post(this.url+"/registrar/usuario",usuario,this.options).subscribe(response =>{
        resolve(response);
      }, (error) =>{
        reject(error);
      });
    });
  }

  // VALIDAR USUARIO
  validarUsuarioFacebook(user){
    return new Promise((resolve, reject) =>{
      this.http.post(this.url+"/usuario/validar",user,this.options).subscribe(response =>{
        resolve(response);
      }, (error) =>{
        reject(error);
      });
    });
  }

  // REGISTRAR NUEVA CITA
  postRegistrarNuevaCita(data){
    return new Promise((resolve, reject) => {
      this.http.post(this.url+'/cita/registrar',data,this.options)
      .subscribe(Response => {
        resolve(Response);
      }, (error) => {
        reject(error);
      });
    });
  }

    // DISPONIBILIDAD  CITA
    postDisponibilidadCita(data){
      return new Promise((resolve, reject) => {
        this.http.post(this.url+'/cita/disponibilidad',data,this.options)
        .subscribe(Response => {
          resolve(Response);
        }, (error) => {
          reject(error);
        });
      });
    }

  //LISTAR HORARIOS
  getListarHorarios(){
    return this.http.get(this.url+"/cita/horarios",this.options);
  }
  //LISTAR PROXIMAS CITAS
  getListarProximasCitas(data){
    return this.http.get(this.url+"/cita/proxima/"+data,this.options);
  }          
  //LISTAR HISTORIAL CITAS
  getListarHistorialCitas(data){
    return this.http.get(this.url+"/cita/historial/"+data,this.options);
  }    
  // CITAS DIA
  postCitasDia(data){
      return new Promise((resolve, reject) => {
        this.http.post(this.url+'/cita/dia',data,this.options)
        .subscribe(Response => {
          resolve(Response);
        }, (error) => {
          reject(error);
        });
      });
    }


  //LISTAR TRATAMIENTOS
  listarTratamientos(){
    return this.http.get(this.url+"/tratamiento/listar/"+1,this.options);
  }

  //LISTAR TIPOS TRATAMIENTOS
  listarTiposTratamientos(){
    return this.http.get(this.url+"/tipotratamiento/listar/"+1,this.options);
  }

  //BUSCAR TRATAMIENTOS 
  buscarTratamiento(val){
    return this.http.get(this.url+"/tratamiento/buscar/"+val,this.options);
  }

  //VALIDAR CORREO PARA RECUPERAR CONTRASEÑA
  validarCorreo(correo){
    return this.http.get(this.url+"/usuario/validar/correo/"+correo,this.options);
  }

  // ENVIAR CORREO
  enviarCorreo(detalle){
    return new Promise((resolve, reject) =>{
      this.http.post('https://bube.com.pe/emailBube/api/emailbube/email/enviar',detalle,this.options)
        .subscribe(Response =>{
          resolve(Response); 
        }, (error) =>{
          reject(error);
        });
    });
  }

  //CAMBIAR CONTRASEÑIA
  cambiarContrasenia(user){
    return new Promise((resolve, reject) =>{
      this.http.post(this.url+"/usuario/cambiar/contrasenia",user,this.options)
        .subscribe((response) =>{
          resolve(response);
        },(error) =>{
          reject(error);
        });
    });
  }
}
