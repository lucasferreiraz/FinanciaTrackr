import { Component, OnInit } from '@angular/core';
import { Pessoa } from 'src/app/core/model';
import { PessoaService } from '../pessoa.service';
import { MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  pessoa = new Pessoa();

  estados: any;
  cidades: any;
  estadoSelecionado: any;

  constructor(private pessoaService: PessoaService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit(): void {
    const idPessoa = this.route.snapshot.params['id'];

    this.title.setTitle("Nova Pessoa")
    this.listarEstados()
    if (idPessoa) {
      this.carregarPessoa(idPessoa);
    }
  }

  salvar(form: NgForm) {
    if (this.editando) {
      this.atualizarPessoa(form);
    } else {
      this.adicionarPessoa(form);
    }
  }

  adicionarPessoa(pessoaForm: NgForm) {
    this.pessoaService.adicionar(this.pessoa)
      .subscribe(() => {
        this.messageService.add({
          severity: 'success',
          detail: 'Pessoa adicionada com sucesso!'
        });

        pessoaForm.reset();
        this.pessoa = new Pessoa();
      },
        error => this.errorHandler.handle(error))
  }

  atualizarPessoa(form: NgForm) {
    this.pessoaService.atualizar(this.pessoa)
      .subscribe((pessoa: Pessoa) => {
        this.pessoa = pessoa;

        this.messageService.add({
          severity: 'success',
          detail: 'Pessoa alterada com sucesso!'
        });

        this.atualizarTituloEdicao();
      },
        error => this.errorHandler.handle(error))
  }

  carregarPessoa(id: number) {
    this.pessoaService.buscaPorId(id)
      .subscribe(pessoa => {
        this.pessoa = pessoa;
        this.atualizarTituloEdicao();

        this.estadoSelecionado = (this.pessoa.address.city) ?
          this.pessoa.address.city.state.id : null;

        if (this.estadoSelecionado) {
          this.listarCidades();
        }
      },
        error => this.errorHandler.handle(error))
  }

  novo(pessoaForm: NgForm) {
    pessoaForm.reset(new Pessoa);

    this.router.navigate(['pessoas/nova']);
  }

  get editando() {
    return Boolean(this.pessoa.id)
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de pessoa: ${this.pessoa.name}`);
  }

  listarEstados() {
    this.pessoaService.listarEstados()
      .subscribe(response => {
        this.estados = response.map(estado => ({ label: estado.name, value: estado.id }));
      },
        error => this.errorHandler.handle(error))
  }

  listarCidades() {
    this.pessoaService.pesquisarCidades(this.estadoSelecionado)
      .subscribe(response => {
        this.cidades = response.map(cidade => ({ label: cidade.name, value: cidade.id }));
      },
        erro => this.errorHandler.handle(erro))
  }
}
