import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { restablecerContrasenia2Page } from './restablecerContrasenia2.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

const routes: Routes = [
  {
    path: '',
    component: restablecerContrasenia2Page,
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
  declarations: [restablecerContrasenia2Page]
})

export class restablecerContrasenia2Module{

}