import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Facebook} from '@ionic-native/facebook/ngx';
import { AES256 } from '@ionic-native/aes-256/ngx';
import { NgCalendarModule } from 'ionic2-calendar';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,HttpClientModule,NgCalendarModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },Facebook,AES256,StatusBar],
  bootstrap: [AppComponent],
})
export class AppModule {}
