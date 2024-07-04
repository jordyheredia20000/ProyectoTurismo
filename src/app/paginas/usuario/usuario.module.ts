import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';
import { UsuarioPageRoutingModule } from './usuarios-routing.module';
import { ComponentesModule } from 'src/app/componentes/componentes.module';
import { IonicModule } from '@ionic/angular';
import { ChatUsuarioComponent } from './chat-usuario/chat-usuario.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [ListaUsuariosComponent, ChatUsuarioComponent],
  imports: [
    CommonModule,
    UsuarioPageRoutingModule,
    ComponentesModule,
    FormsModule,
    IonicModule
  ]
})
export class UsuarioModule { }
