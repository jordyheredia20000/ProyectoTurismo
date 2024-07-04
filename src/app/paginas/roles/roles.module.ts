import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRolesComponent } from './admin-roles/admin-roles.component';
import { IonicModule } from '@ionic/angular';
import { ComponentesModule } from 'src/app/componentes/componentes.module';
import { RolPageRoutingModule } from './rol-routing.module';



@NgModule({
  declarations: [AdminRolesComponent],
  imports: [
    CommonModule,
    ComponentesModule,
    IonicModule,
    RolPageRoutingModule
  ]
})
export class RolesModule { }
