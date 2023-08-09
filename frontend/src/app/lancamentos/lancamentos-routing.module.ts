import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LancamentosPesquisaComponent } from './lancamentos-pesquisa/lancamentos-pesquisa.component';
import { LancamentoCadastroComponent } from './lancamento-cadastro/lancamento-cadastro.component';
import { authGuard } from '../seguranca/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LancamentosPesquisaComponent,
    canActivate: [authGuard],
    data: { roles: ['ROLE_SEARCH_EXPENDITURE'] }
  },
  {
    path: 'novo',
    component: LancamentoCadastroComponent,
    canActivate: [authGuard],
    data: { roles: ['ROLE_CREATE_EXPENDITURE'] }
  },
  {
    path: ':id',
    component: LancamentoCadastroComponent,
    canActivate: [authGuard],
    data: { roles: ['ROLE_CREATE_EXPENDITURE'] }
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class LancamentosRoutingModule { }
