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

  relatorioCarregado: boolean = false;

  constructor(private relatorioService: RelatoriosService) { }

  gerar() {
    this.relatorioCarregado = true

    this.relatorioService.relatorioLancamentosPorPessoa(this.periodoInicio, this.periodoFim)
      .subscribe(relatorio => {
        const blob = new Blob([relatorio], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        window.open(url, '_blank');

        this.relatorioCarregado = false
      })
  }
}
