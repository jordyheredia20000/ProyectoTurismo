import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CardLugarComponent } from './card-lugar/card-lugar.component';
import { LugarFormComponent } from '../formularios/lugar-form/lugar-form.component';
import { AdminLugarComponent } from './admin-lugar/admin-lugar.component';
import { DetalleComponent } from './detalle/detalle.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { FavoritosComponent } from './favoritos/favoritos.component';

const routes: Routes = [
  {
    path: 'card',
    component: CardLugarComponent
  },
  {
    path:'admin',
    component:AdminLugarComponent
  },
  {
    path:'detalle',
    component:DetalleComponent
  },
  {
    path:'buscar',
    component:BusquedaComponent
  },
  {
    path:'fav',
    component:FavoritosComponent
  },
  {
    path: '',
    redirectTo: 'admin',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LugarPageRoutingModule {}
