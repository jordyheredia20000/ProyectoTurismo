import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminRolesComponent } from './admin-roles/admin-roles.component';

const routes: Routes = [
  {
    path: '',
    component: AdminRolesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RolPageRoutingModule {}
