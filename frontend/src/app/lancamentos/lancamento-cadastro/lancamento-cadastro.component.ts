import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoriaService } from 'src/app/categorias/categoria.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Lancamento } from 'src/app/core/model';
import { PessoaService } from 'src/app/pessoas/pessoa.service';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  tipos = [
    { label: 'Receita', value: 'REVENUE' },
    { label: 'Despesa', value: 'EXPENSE' },
  ];

  categorias = [];
  pessoas = [];

  lancamento = new Lancamento()

  constructor(
    private route: ActivatedRoute,
    private categoriaService: CategoriaService,
    private pessoaService: PessoaService,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit():void {
    this.carregarCategorias()
    this.carregarPessoas()
  }

  salvar(lancamentoForm: NgForm) {
    console.log(this.lancamento);
  }

  carregarCategorias() {
    return this.categoriaService.pesquisarTodas()
      .subscribe(categorias => {
        this.categorias = categorias.map((c:any) => ({ label: c.name, value: c.id }));
      },
      error => this.errorHandler.handle(error))
  }

  carregarPessoas() {
    return this.pessoaService.pesquisarTodas()
      .subscribe(pessoas => {
        this.pessoas = pessoas['content'].map((p:any) => ({ label: p.name, value: p.id }));
      },
      error => this.errorHandler.handle(error))
  }

}
