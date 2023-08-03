import { Component } from '@angular/core';
import { PessoaFiltro, PessoaService } from '../pessoa.service';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent {

  itensPorPagina = 0
  totalRegistros = 0
  filtro = new PessoaFiltro()

  pessoas = [];

  constructor(
    private pessoaService: PessoaService
  ) { }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina

    this.pessoaService.pesquisar(this.filtro)
      .subscribe(
        data => {
          this.itensPorPagina = data['size']
          this.totalRegistros = data['totalElements']
          this.pessoas = data['content']
        }
      )
  }

  onExcluirPessoa() {
    this.pesquisar()
  }
}
