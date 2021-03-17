import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(private statusBar: StatusBar,public router:Router,) {
    this.statusBar.overlaysWebView(false);
    // set status bar to white
    this.statusBar.backgroundColorByName('white');
    this.statusBar.styleDefault();
    this.getSesion();
  }

  async getSesion(){
    const ret = await Storage.get({ key: 'sesion' });
    console.log(ret)
    const user = JSON.parse(ret.value);
    
    if(user == undefined || user == null || user == 0){
      this.router.navigate(['']);
    }else{
      let indicador = user.indicador;

      if(indicador == 1){
        this.router.navigate(['tabs/inicio']);
      }else{
        if(indicador == 2){
          this.router.navigate(['login']);
        }
      }
    }
      
    console.log(user);
  }

}
