import { IonicModule } from '@ionic/angular';
import { RouterModule,Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { nuevaCitaDatosPage } from './nuevaCitaDatos.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { SharedDirectivesModule } from '../directives/shared-directives.module';

const routes: Routes = [
  {
    path: '',
    component: nuevaCitaDatosPage,
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ExploreContainerComponentModule,
    IonicModule,
    SharedDirectivesModule,
    RouterModule.forChild(routes)
  ],
  declarations: [nuevaCitaDatosPage]
})
export class nuevaCitaDatosModule {}