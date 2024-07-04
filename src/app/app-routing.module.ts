import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'inicio',
    loadChildren: () => import('./paginas/inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
  {
    path: 'usuarios',
    loadChildren: () => import('./paginas/usuario/usuario.module').then( m => m.UsuarioModule)
  },
  {
    path: 'lugares',
    loadChildren: () => import('./paginas/lugar/lugar.module').then( m => m.LugarModule)
  },
  {
    path: 'categorias',
    loadChildren: () => import('./paginas/categoria/categoria.module').then( m => m.CategoriaModule)
  },
  {
    path: 'periodos',
    loadChildren: () => import('./paginas/periodos/periodos.module').then( m => m.PeriodosModule)
  },
  {
    path: 'roles',
    loadChildren: () => import('./paginas/roles/roles.module').then( m => m.RolesModule)
  },
  {
    path: 'permisos',
    loadChildren: () => import('./paginas/permisos/permisos.module').then( m => m.PermisosModule)
  },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
