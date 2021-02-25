import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {onBoardingPage} from './onBoarding.page'
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

const routes: Routes = [
    {
      path: '',
      component: onBoardingPage
    }
  ];
  
  @NgModule({
    imports: [
      CommonModule,
      FormsModule,
      ExploreContainerComponentModule,
      IonicModule,
      RouterModule.forChild(routes)
    ],
    declarations: [onBoardingPage]
  })

export class onBoardingModule{

}