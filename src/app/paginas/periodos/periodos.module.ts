import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPeriodosComponent } from './admin-periodos/admin-periodos.component';
import { PeriodoPageRoutingModule } from './periodo-routing.module';
import { ComponentesModule } from 'src/app/componentes/componentes.module';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [AdminPeriodosComponent],
  imports: [
    CommonModule,
    PeriodoPageRoutingModule,
    ComponentesModule,
    IonicModule,
  ]
})
export class PeriodosModule { }
