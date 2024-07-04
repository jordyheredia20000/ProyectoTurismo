import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';
import { ChatUsuarioComponent } from './chat-usuario/chat-usuario.component';

const routes: Routes = [
  {
    path: '',
    component: ListaUsuariosComponent
  },
  {
    path:'chat',
    component:ChatUsuarioComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuarioPageRoutingModule {}
