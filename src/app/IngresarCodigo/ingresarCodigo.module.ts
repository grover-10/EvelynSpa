import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ingresarCodigoPage } from './ingresarCodigo.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

const routes: Routes = [
  {
    path: '',
    component: ingresarCodigoPage,
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
  declarations: [ingresarCodigoPage]
})

export class ingresarCodigoModule{

}