import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TableLazyLoadEvent } from 'primeng/table';

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

  aoMudarPagina(event: TableLazyLoadEvent) {
    const pagina = (event.first ?? 0) / (event.rows ?? 1)
    this.paginaMudou.emit(pagina)
  }

}
