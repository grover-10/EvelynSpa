import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RegistrarCuentaPage } from './registrar-cuenta.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { SharedDirectivesModule } from '../directives/shared-directives.module';

const routes: Routes = [
  {
    path: '',
    component: RegistrarCuentaPage,
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    IonicModule,
    SharedDirectivesModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RegistrarCuentaPage]
})

export class registrarCuentaModule{

 
}