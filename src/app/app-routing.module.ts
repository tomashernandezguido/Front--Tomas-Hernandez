import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './pages/admin/admin.component';
import { InicioSesionComponent } from './pages/inicio-sesion/inicio-sesion.component';
import { InicioComponent } from './pages/inicio/inicio.component';

const routes: Routes = [
  {
    path: '',
    title: "Mi Portfolio",
    component: InicioComponent
  },
  {
    path: 'admin',
    title: 'Administrador',
    component: AdminComponent
  },
  {
    path: 'login',
    title: 'Inicio de sesion',
    component: InicioSesionComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
