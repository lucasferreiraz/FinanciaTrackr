import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CategoriaService } from 'src/app/categorias/categoria.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Lancamento } from 'src/app/core/model';
import { PessoaService } from 'src/app/pessoas/pessoa.service';
import { LancamentoService } from '../lancamento.service';
import { MessageService } from 'primeng/api';
import { Title } from '@angular/platform-browser';

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
    private router: Router,
    private lancamentoService: LancamentoService,
    private categoriaService: CategoriaService,
    private pessoaService: PessoaService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private title: Title
  ) { }

  ngOnInit(): void {
    this.title.setTitle("Novo lançamento")

    const idLancamento = this.route.snapshot.params['id'];

    if (idLancamento) {
      this.carregarLancamento(idLancamento);
    }

    this.carregarCategorias()
    this.carregarPessoas()
  }

  salvar() {
    if(this.editando) {
      this.atualizarLancamento()
    } else {
      this.adicionarLancamento()
    }
  }

  adicionarLancamento() {
    this.lancamentoService.adicionar(this.lancamento)
      .subscribe(lancamentoAdicionado => {
        this.messageService.add({
          severity: 'success',
          detail: 'Lançamento adicionado com sucesso!'
        });
        this.router.navigate(['lancamentos/', lancamentoAdicionado.id])
      },
        error => this.errorHandler.handle(error)
      )
  }

  atualizarLancamento() {
    this.lancamentoService.atualizar(this.lancamento)
      .subscribe(() => {
        this.messageService.add({
          severity: 'success',
          detail: 'Lançamento alterado com sucesso!'
        });

        this.atualizarTituloEdicao()
      },
        error => this.errorHandler.handle(error)
      )
  }

  carregarLancamento(id: number) {
    this.lancamentoService.buscarPorId(id)
      .subscribe(lancamento => {
        this.lancamentoService.converterStringsParaDatas([lancamento])
        this.lancamento = lancamento
        this.atualizarTituloEdicao()
      })
  }

  carregarCategorias() {
    return this.categoriaService.pesquisarTodas()
      .subscribe(categorias => {
        this.categorias = categorias.map((c: any) => ({ label: c.name, value: c.id }));
      },
        error => this.errorHandler.handle(error))
  }

  carregarPessoas() {
    return this.pessoaService.pesquisarTodas()
      .subscribe(pessoas => {
        this.pessoas = pessoas['content'].map((p: any) => ({ label: p.name, value: p.id }));
      },
        error => this.errorHandler.handle(error))
  }

  get editando () {
    return Boolean(this.lancamento.id)
  }

  novo(lancamentoForm: NgForm) {
    lancamentoForm.reset(new Lancamento);

    this.router.navigate(['lancamentos/novo']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de lançamento: ${this.lancamento.description}`)
  }

}
