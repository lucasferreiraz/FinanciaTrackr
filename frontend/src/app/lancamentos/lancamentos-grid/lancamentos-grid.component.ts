import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { TableLazyLoadEvent } from 'primeng/table';
import { LancamentoService } from '../lancamento.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { AuthService } from 'src/app/seguranca/auth.service';

@Component({
  selector: 'app-lancamentos-grid',
  templateUrl: './lancamentos-grid.component.html',
  styleUrls: ['./lancamentos-grid.component.css']
})
export class LancamentosGridComponent {

  @Input() lancamentos: any;
  @Input() itensPorPagina: any;
  @Input() totalRegistros: any;

  @Output() paginaMudou = new EventEmitter<number>();
  @Output() excluirLancamento = new EventEmitter<any>();

  @ViewChild('tabela') grid: any

  constructor(
    private lancamentoService: LancamentoService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private errorHandler: ErrorHandlerService,
    private auth: AuthService
  ) { }

  aoMudarPagina(event: TableLazyLoadEvent) {
    const pagina = (event.first ?? 0) / (event.rows ?? 1)
    this.paginaMudou.emit(pagina)
  }

  confirmarExclusao(lancamento: any): void {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(lancamento);
      }
    });
  }

  excluir(lancamento: any) {
    this.lancamentoService.excluir(lancamento.id)
      .subscribe(() => {
        if (this.grid.first === 0) {
          this.paginaMudou.emit(0)
        } else {
          this.excluirLancamento.emit()
          this.grid.first = 0
        }

        this.messageService.add({
          severity: 'success',
          detail: 'Lançamento excluído com sucesso!'
        })
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
