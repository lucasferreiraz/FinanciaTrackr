import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PaginaNaoEncontradaComponent } from './core/pagina-nao-encontrada/pagina-nao-encontrada.component';
import { LancamentosRoutingModule } from './lancamentos/lancamentos-routing.module';
import { PessoasRoutingModule } from './pessoas/pessoas-routing.module';
import { SegurancaRoutingModule } from './seguranca/seguranca-routing.module';

const routes: Routes = [
  { path: '', redirectTo: 'lancamentos', pathMatch: 'full' },
  { path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent},
  { path: '**', redirectTo: 'pagina-nao-encontrada'}
]


@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    LancamentosRoutingModule,
    PessoasRoutingModule,
    SegurancaRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
