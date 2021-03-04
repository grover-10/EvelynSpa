import { IonicModule } from '@ionic/angular';
import { RouterModule,Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { nuevaCitaHorarioPage } from './nuevaCitaHorario.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { NgCalendarModule } from 'ionic2-calendar';
import { SharedDirectivesModule } from '../directives/shared-directives.module';

const routes: Routes = [
  {
    path: '',
    component: nuevaCitaHorarioPage,
  }
];

@NgModule({
  imports: [
    CommonModule,
    NgCalendarModule,
    FormsModule,
    ExploreContainerComponentModule,
    IonicModule,
    SharedDirectivesModule,
    RouterModule.forChild(routes)
  ],
  declarations: [nuevaCitaHorarioPage]
})
export class nuevaCitaHorarioModule {}