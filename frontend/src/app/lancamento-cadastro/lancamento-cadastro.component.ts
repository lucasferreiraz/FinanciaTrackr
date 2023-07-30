import { Component } from '@angular/core';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent {

  tipos = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' },
  ];

  categorias = [
    { label: 'Alimentação', value: 1 },
    { label: 'Transporte', value: 2 },

  ];

  pessoas = [
    { label: 'Alberto Nunes de Souza', value: 1 },
    { label: 'Gilbeto Souza Maior', value: 2 },
    { label: 'João Souza Santos', value: 3 },
  ];


}
