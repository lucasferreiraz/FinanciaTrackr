import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { TableLazyLoadEvent } from 'primeng/table';
import { LancamentoService } from '../lancamento.service';

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
    private lancamentoService: LancamentoService
  ) { }

  aoMudarPagina(event: TableLazyLoadEvent) {
    const pagina = (event.first ?? 0) / (event.rows ?? 1)
    this.paginaMudou.emit(pagina)
  }

  excluir(lancamento: any) {
    this.lancamentoService.excluir(lancamento.id)
      .subscribe(() => {
        if(this.grid.first === 0) {
          this.paginaMudou.emit(0)
        } else {
          this.excluirLancamento.emit()
          this.grid.first = 0
        }
      })
  }

}
