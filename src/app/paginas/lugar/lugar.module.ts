import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentesModule } from 'src/app/componentes/componentes.module';
import { IonicModule } from '@ionic/angular';
import { CardLugarComponent } from './card-lugar/card-lugar.component';
import { LugarPageRoutingModule } from './lugares-routing.module';
import { AdminLugarComponent } from './admin-lugar/admin-lugar.component';
import { DetalleComponent } from './detalle/detalle.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { FormsModule } from '@angular/forms';
import { FavoritosComponent } from './favoritos/favoritos.component';



@NgModule({
  declarations: [CardLugarComponent, AdminLugarComponent, DetalleComponent, BusquedaComponent, FavoritosComponent],
  imports: [
    CommonModule,
    ComponentesModule,
    IonicModule,
    LugarPageRoutingModule,
    FormsModule
  ],
  exports:[CardLugarComponent, DetalleComponent, BusquedaComponent]
})
export class LugarModule { }
