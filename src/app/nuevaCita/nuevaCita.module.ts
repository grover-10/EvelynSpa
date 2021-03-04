import { IonicModule } from '@ionic/angular';
import { RouterModule,Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { nuevaCitaPage } from './nuevaCita.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { SharedDirectivesModule } from '../directives/shared-directives.module';

const routes: Routes = [
  {
    path: '',
    component: nuevaCitaPage,
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
  declarations: [nuevaCitaPage]
})
export class nuevaCitaModule {}
