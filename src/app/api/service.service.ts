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
      this.http.post(this.url2+'/cita/registrar',data,this.options)
      .subscribe(Response => {
        resolve(Response);
      }, (error) => {
        reject(error);
      });
    });
  }

  //LISTAR TRATAMIENTOS
  listarTratamientos(){
    return this.http.get(this.url2+"/tratamiento/listar/"+1,this.options);
  }

  //LISTAR TIPOS TRATAMIENTOS
  listarTiposTratamientos(){
    return this.http.get(this.url2+"/tipotratamiento/listar/"+1,this.options);
  }

}
