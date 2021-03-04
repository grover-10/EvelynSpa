import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { restablecerContraseniaPage } from './restablecerContrasenia.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

const routes: Routes = [
  {
    path: '',
    component: restablecerContraseniaPage,
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
  declarations: [restablecerContraseniaPage]
})

export class restablecerContraseniaModule{

}