import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoriaService } from 'src/app/categorias/categoria.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Lancamento } from 'src/app/core/model';
import { PessoaService } from 'src/app/pessoas/pessoa.service';
import { LancamentoService } from '../lancamento.service';
import { MessageService } from 'primeng/api';

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
    private lancamentoService: LancamentoService,
    private categoriaService: CategoriaService,
    private pessoaService: PessoaService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit(): void {

    const idLancamento = this.route.snapshot.params['id'];

    if (idLancamento) {
      this.carregarLancamento(idLancamento);
    }

    this.carregarCategorias()
    this.carregarPessoas()
  }

  salvar(lancamentoForm: NgForm) {
    if(this.editando) {
      this.atualizarLancamento()
    } else {
      this.adicionarLancamento(lancamentoForm)
    }
  }

  adicionarLancamento(lancamentoForm: NgForm) {
    this.lancamentoService.adicionar(this.lancamento)
      .subscribe(() => {
        this.messageService.add({
          severity: 'success',
          detail: 'Lançamento adicionado com sucesso!'
        });

        lancamentoForm.reset();
        this.lancamento = new Lancamento();
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
      },
        error => this.errorHandler.handle(error)
      )
  }

  carregarLancamento(id: number) {
    this.lancamentoService.buscarPorId(id)
      .subscribe(lancamento => {
        this.lancamentoService.converterStringsParaDatas([lancamento])
        this.lancamento = lancamento
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

}
