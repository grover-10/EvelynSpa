import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {loginPage} from './login.page'
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import {modalErrorLoginPage} from '../modals/modalErrorLogin/modalErrorLogin.page';

const routes: Routes = [
    {
      path: '',
      component: loginPage
    }
  ];
  
  @NgModule({
    entryComponents: [modalErrorLoginPage],
    imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      ExploreContainerComponentModule,
      IonicModule,
      RouterModule.forChild(routes)
    ],
    declarations: [loginPage,modalErrorLoginPage]
  })

  export class loginModule{

  }