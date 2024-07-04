import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminPermisosComponent } from './admin-permisos/admin-permisos.component';

const routes: Routes = [
  {
    path: '',
    component: AdminPermisosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PermisosPageRoutingModule {}
