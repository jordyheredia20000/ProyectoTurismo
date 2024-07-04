import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsuarioFormComponent } from './paginas/formularios/usuario-form/usuario-form.component';
import { LugarFormComponent } from './paginas/formularios/lugar-form/lugar-form.component';
import { CategoriaFormComponent } from './paginas/formularios/categoria-form/categoria-form.component';
import { PeriodoFormComponent } from './paginas/formularios/periodo-form/periodo-form.component';
import { PermisosFormComponent } from './paginas/formularios/permisos-form/permisos-form.component';
import { RolesFormComponent } from './paginas/formularios/roles-form/roles-form.component';
import { ComenFormularioComponent } from './paginas/formularios/comen-formulario/comen-formulario.component';

@NgModule({
  declarations: [AppComponent,UsuarioFormComponent,LugarFormComponent,CategoriaFormComponent,PeriodoFormComponent,PermisosFormComponent,RolesFormComponent,ComenFormularioComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,HttpClientModule, FormsModule,
    ReactiveFormsModule ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
