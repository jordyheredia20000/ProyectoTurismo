import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentesModule } from 'src/app/componentes/componentes.module';
import { IonicModule } from '@ionic/angular';
import { AdminPermisosComponent } from './admin-permisos/admin-permisos.component';
import { PermisosPageRoutingModule } from './permisos-routing.module';



@NgModule({
  declarations: [AdminPermisosComponent],
  imports: [
    CommonModule,
    ComponentesModule,
    IonicModule,
    PermisosPageRoutingModule
  ]
})
export class PermisosModule { }
