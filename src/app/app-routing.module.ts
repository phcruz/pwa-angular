import { ListarSegurosComponent } from './components/listar-seguros/listar-seguros.component';
import { CadastroSeguroComponent } from './components/cadastro-seguro/cadastro-seguro.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'cadastro' },
    { path: 'cadastro', component: CadastroSeguroComponent },
    { path: 'listar', component: ListarSegurosComponent },
  ];
  
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
