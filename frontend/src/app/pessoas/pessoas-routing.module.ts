import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PessoaCadastroComponent } from './pessoa-cadastro/pessoa-cadastro.component';
import { PessoasPesquisaComponent } from './pessoas-pesquisa/pessoas-pesquisa.component';
import { authGuard } from '../seguranca/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: PessoasPesquisaComponent,
    canActivate: [authGuard],
    data: { roles: ['ROLE_SEARCH_PERSON'] }
  },
  {
    path: 'nova',
    component: PessoaCadastroComponent,
    canActivate: [authGuard],
    data: { roles: ['ROLE_CREATE_PERSON'] }
  },
  {
    path: ':id',
    component: PessoaCadastroComponent,
    canActivate: [authGuard],
    data: { roles: ['ROLE_CREATE_PERSON'] }
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
export class PessoasRoutingModule { }
