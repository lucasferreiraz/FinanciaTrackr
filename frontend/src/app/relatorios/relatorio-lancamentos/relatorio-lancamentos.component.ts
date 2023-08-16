import { Component } from '@angular/core';
import { RelatoriosService } from '../relatorios.service';

@Component({
  selector: 'app-relatorio-lancamentos',
  templateUrl: './relatorio-lancamentos.component.html',
  styleUrls: ['./relatorio-lancamentos.component.css']
})
export class RelatorioLancamentosComponent {
  periodoInicio!: Date;
  periodoFim!: Date;

  constructor(private relatorioService: RelatoriosService) { }

  gerar() {
    this.relatorioService.relatorioLancamentosPorPessoa(this.periodoInicio, this.periodoFim)
      .subscribe(relatorio => {
        const blob = new Blob([relatorio], { type: 'application/pdf' }); // O tipo deve ser ajustado conforme o tipo de relatório
        const url = URL.createObjectURL(blob);
        window.open(url, '_blank');
      })
  }
}
