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
  {
    path: 'nuevaCitaHorario',
    loadChildren: () => import('./nuevaCitaHorario/nuevaCitaHorario.module').then(m => m.nuevaCitaHorarioModule)
  },
  {
    path: 'nuevaCitaDatos',
    loadChildren: () => import('./nuevaCitaDatos/nuevaCitaDatos.module').then(m => m.nuevaCitaDatosModule)
  },
  {
    path: 'nuevaCitaDetalle',
    loadChildren: () => import('./nuevaCitaDetalle/nuevaCitaDetalle.module').then(m => m.nuevaCitaDetalleModule)
  },
  {
    path: 'ingresarCodigo',
    loadChildren: () => import('./ingresarCodigo/ingresarCodigo.module').then(m => m.ingresarCodigoModule)
  },
  {
    path: 'restablecerContrasenia',
    loadChildren: () => import('./restablecerContrasenia/restablecerContrasenia.module').then(m => m.restablecerContraseniaModule)
  },
  {
    path: 'restablecerContrasenia2',
    loadChildren: () => import('./restablecerContrasenia2/restablecerContrasenia2.module').then(m => m.restablecerContrasenia2Module)
  },
  {
    path: 'misDatos',
    loadChildren: () => import('./misDatos/misDatos.module').then(m => m.misDatosModule)
  },
  {
    path: 'miPuntaje',
    loadChildren: () => import('./miPuntaje/miPuntaje.module').then(m => m.miPuntajeModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
