import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InicioPageRoutingModule } from './inicio-routing.module';

import { InicioPage } from './inicio.page';
import { LoginComponent } from './login/login.component';
import { PageComponent } from './page/page.component';
import { ComponentesModule } from 'src/app/componentes/componentes.module';
import { LugarModule } from '../lugar/lugar.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InicioPageRoutingModule,
    ComponentesModule,
    LugarModule
  ],
  declarations: [InicioPage,LoginComponent, PageComponent]
})
export class InicioPageModule {}
