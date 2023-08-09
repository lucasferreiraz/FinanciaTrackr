import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PessoaCadastroComponent } from './pessoa-cadastro/pessoa-cadastro.component';
import { PessoasPesquisaComponent } from './pessoas-pesquisa/pessoas-pesquisa.component';
import { authGuard } from '../seguranca/auth.guard';

const routes: Routes = [
  {
    path: 'pessoas',
    component: PessoasPesquisaComponent,
    canActivate: [authGuard],
    data: { roles: ['ROLE_SEARCH_PERSON'] }
  },
  {
    path: 'pessoas/nova',
    component: PessoaCadastroComponent,
    canActivate: [authGuard],
    data: { roles: ['ROLE_CREATE_PERSON'] }
  },
  { path: 'pessoas/:id',
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
