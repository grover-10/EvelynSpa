import { IonicModule } from '@ionic/angular';
import { RouterModule,Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { nuevaCitaDetallePage } from './nuevaCitaDetalle.page';
import {modalCitaReservadaPage} from '../modals/modalCitaReservada/modalCitaReservada.page';
import { SharedDirectivesModule } from '../directives/shared-directives.module';
const routes: Routes = [
  {
    path: '',
    component: nuevaCitaDetallePage,
  }
];

@NgModule({
  entryComponents: [modalCitaReservadaPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedDirectivesModule,
    RouterModule.forChild(routes)
  ],
  declarations: [nuevaCitaDetallePage,modalCitaReservadaPage]
})

export class nuevaCitaDetalleModule{}