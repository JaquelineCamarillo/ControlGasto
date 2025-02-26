import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerificacionComponent } from './components/verificacion/verificacion.component';
import { PantallaLoginComponent } from './components/pantalla-login/pantalla-login.component';

const routes: Routes = [
  { path: 'pantalla-login', component: PantallaLoginComponent }, // Agrega la ruta
  { path: '', redirectTo: '/pantalla-login', pathMatch: 'full' } // Ruta por defecto
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }