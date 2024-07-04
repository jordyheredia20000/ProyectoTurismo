import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminPeriodosComponent } from './admin-periodos/admin-periodos.component';

const routes: Routes = [
  {
    path: '',
    component: AdminPeriodosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PeriodoPageRoutingModule {}
