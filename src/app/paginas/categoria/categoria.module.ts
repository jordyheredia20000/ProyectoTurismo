import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminCategoriaComponent } from './admin-categoria/admin-categoria.component';
import { ComponentesModule } from 'src/app/componentes/componentes.module';
import { IonicModule } from '@ionic/angular';
import { CategoriaPageRoutingModule } from './categoria-routing.module';



@NgModule({
  declarations: [AdminCategoriaComponent],
  imports: [
    CommonModule,
    ComponentesModule,
    IonicModule,
    CategoriaPageRoutingModule
  ]
})
export class CategoriaModule { }
