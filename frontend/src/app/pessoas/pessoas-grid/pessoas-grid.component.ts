import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { TableLazyLoadEvent } from 'primeng/table';
import { PessoaService } from '../pessoa.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { AuthService } from 'src/app/seguranca/auth.service';

@Component({
  selector: 'app-pessoas-grid',
  templateUrl: './pessoas-grid.component.html',
  styleUrls: ['./pessoas-grid.component.css']
})
export class PessoasGridComponent {

  @Input() pessoas: any;
  @Input() itensPorPagina: any;
  @Input() totalRegistros: any;

  @Output() paginaMudou = new EventEmitter<number>();
  @Output() excluirPessoa = new EventEmitter<any>();

  @ViewChild('tabela') grid: any

  constructor(
    private pessoaService: PessoaService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private errorHandler: ErrorHandlerService,
    private auth: AuthService
  ) { }

  aoMudarPagina(event: TableLazyLoadEvent) {
    const pagina = (event.first ?? 0) / (event.rows ?? 1)
    this.paginaMudou.emit(pagina)
  }

  confirmarExclusao(pessoa: any): void {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(pessoa);
      }
    });
  }

  excluir(pessoa: any) {
    this.pessoaService.excluir(pessoa.id)
      .subscribe(() => {
        if (this.grid.first === 0) {
          this.paginaMudou.emit(0)
        } else {
          this.excluirPessoa.emit()
          this.grid.first = 0
        }

        this.messageService.add({
          severity: 'success',
          detail: 'Pessoa excluída com sucesso!'
        })
      },
        error => {
          console.log(error)
          this.errorHandler.handle(error)
        }
      )
  }

  mudarStatus(pessoa: any): void {
    const novoStatus = !pessoa.active;

    this.pessoaService.mudarStatus(pessoa.id, novoStatus)
      .subscribe(() => {
        const acao = novoStatus ? 'ativada' : 'desativada';

        pessoa.active = novoStatus;
        this.messageService.add({ severity: 'success',
          detail: `Pessoa ${acao} com sucesso!` });
      },
      error => {
        this.errorHandler.handle(error)
      }
      )
  }

  naoTemPermissao (permissao: string) {
    return !this.auth.temPermissao(permissao);
  }
}
