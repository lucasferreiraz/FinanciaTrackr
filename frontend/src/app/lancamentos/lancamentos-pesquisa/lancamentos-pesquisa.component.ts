import { Component, OnInit } from '@angular/core';
import { LancamentoFiltro, LancamentoService } from '../lancamento.service';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent {

  itensPorPagina = 0
  totalRegistros = 0
  filtro = new LancamentoFiltro()

  lancamentos = [];

  constructor(
    private lancamentoService: LancamentoService
  ) { }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina

    this.lancamentoService.pesquisar(this.filtro)
      .subscribe(
        data => {
          this.itensPorPagina = data['size']
          this.totalRegistros = data['totalElements']
          this.lancamentos = data['content']
        }
      )
  }

  onExcluirLancamento() {
    this.pesquisar()
  }
}
