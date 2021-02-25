import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {validarDatosFacebookPage} from './validarDatosFacebook.page'
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

const routes: Routes = [
    {
      path: '',
      component: validarDatosFacebookPage
    }
  ];
  
  @NgModule({
    entryComponents: [],
    imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      ExploreContainerComponentModule,
      IonicModule,
      RouterModule.forChild(routes)
    ],
    declarations: [validarDatosFacebookPage]
  })

  export class validarDatosFacebookModule{

  }