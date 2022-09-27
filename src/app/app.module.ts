import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './pages/admin/admin.component';
import { InicioSesionComponent } from './pages/inicio-sesion/inicio-sesion.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { NavegacionComponent } from './componentes/navegacion/navegacion.component';
import { PieComponent } from './componentes/pie/pie.component';
import { HeroComponent } from './componentes/hero/hero.component';
import { SobreMiComponent } from './componentes/sobre-mi/sobre-mi.component';
import { TecnologiaComponent } from './componentes/tecnologia/tecnologia.component';
import { TrabajoComponent } from './componentes/trabajo/trabajo.component';
import { EducacionComponent } from './componentes/educacion/educacion.component';
import { ProyectoComponent } from './componentes/proyecto/proyecto.component';
import { ContactoComponent } from './componentes/contacto/contacto.component';
import { FormularioComponent } from './componentes/login/formulario/formulario.component';
import { AdminPersonaComponent } from './componentes/admin/admin-persona/admin-persona.component';
import { AdminSobreMiComponent } from './componentes/admin/admin-sobre-mi/admin-sobre-mi.component';
import { AdminContactosComponent } from './componentes/admin/admin-contactos/admin-contactos.component';
import { AdminTecnologiasComponent } from './componentes/admin/admin-tecnologias/admin-tecnologias.component';
import { AdminEducacionComponent } from './componentes/admin/admin-educacion/admin-educacion.component';
import { AdminProyectoComponent } from './componentes/admin/admin-proyecto/admin-proyecto.component';
import { AdminTrabajoComponent } from './componentes/admin/admin-trabajo/admin-trabajo.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    InicioSesionComponent,
    AdminComponent,
    NavegacionComponent,
    PieComponent,
    HeroComponent,
    SobreMiComponent,
    TecnologiaComponent,
    TrabajoComponent,
    EducacionComponent,
    ProyectoComponent,
    ContactoComponent,
    FormularioComponent,
    AdminPersonaComponent,
    AdminSobreMiComponent,
    AdminContactosComponent,
    AdminTecnologiasComponent,
    AdminEducacionComponent,
    AdminProyectoComponent,
    AdminTrabajoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
