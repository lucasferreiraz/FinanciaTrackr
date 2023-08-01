import { Component, OnInit } from '@angular/core';
import { LancamentoFiltro, LancamentoService } from '../lancamento.service';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {

  descricao: string = '';
  dataVencimentoInicio?: Date;
  dataVencimentoFim?: Date;

  lancamentos = [];

  constructor(
    private lancamentoService: LancamentoService
  ) { }

  ngOnInit(): void {
    this.pesquisar()
  }

  pesquisar() {
    const filtro: LancamentoFiltro = {
      description: this.descricao,
      minDueDate: this.dataVencimentoInicio,
      maxDueDate: this.dataVencimentoFim
    }

    this.lancamentoService.pesquisar(filtro)
      .subscribe(
        data => {
          this.lancamentos = data
        }
      )
  }
}
