import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },{
    path: '',
    loadChildren: () => import('./onBoarding/onBoarding.module').then(m => m.onBoardingModule)
  },{
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.loginModule)
  },{
    path: 'olvidoContrasenia',
    loadChildren: () => import('./olvidoContrasenia/olvidoContrasenia.module').then(m => m.olvidoContraseniaModule)
  },{
    path: 'registrarCuenta',
    loadChildren: () =>  import('./registrarCuenta/registrar-Cuenta.module').then(m => m.registrarCuentaModule)
  },{
    path: 'validarDatosFacebook',
    loadChildren: () => import('./validarDatosFacebook/validarDatosFacebook.module').then(m => m.validarDatosFacebookModule)
  },
  {
    path: 'nuevaCita',
    loadChildren: () => import('./nuevaCita/nuevaCita.module').then(m => m.nuevaCitaModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
