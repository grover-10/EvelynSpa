import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { miPuntajePage } from './miPuntaje.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

const routes: Routes = [
  {
    path: '',
    component: miPuntajePage,
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
  declarations: [miPuntajePage]
})

export class miPuntajeModule{

 
}