import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.configurarGraficoPizza()
    this.configurarGraficoLinha()
  }

  pieChartData: any;

  lineChartData: any;

  configurarGraficoPizza() {
    this.dashboardService.lancamentosPorCategoria()
      .subscribe(dados => {
        this.pieChartData = {
          labels: dados.map((dado: any) => dado.category.name),
          datasets: [
            {
              data: dados.map((dado: any) => dado.amount),
              backgroundColor: ['#FF9900', '#109618', '#990099', '#3B3EAC',
                '#0099C6', '#DD4477', '#3366CC', '#DC3912']
            }
          ]
        };
      })
  }

  configurarGraficoLinha() {
    this.dashboardService.lancamentosPorDia()
      .subscribe(dados => {
        this.dashboardService.converterStringsParaDatas(dados)
        console.log(dados)
        const diasDoMes = this.configurarDiasMes();

        const totaisReceitas = this.totaisPorCadaDiaMes(dados.filter((dado: any) => dado.expenditureType === 'REVENUE'), diasDoMes);
        const totaisDespesas = this.totaisPorCadaDiaMes(dados.filter((dado: any) => dado.expenditureType === 'EXPENSE'), diasDoMes);

        this.lineChartData = {
          labels: diasDoMes,
          datasets: [
            { label: 'Receitas', data: totaisReceitas, borderColor: '#3366CC' },
            { label: 'Despesas', data: totaisDespesas, borderColor: '#D62B00' }
          ]
        }
      })
  }

  private totaisPorCadaDiaMes(lancamentos: any, diasDoMes: any) {
    const totais: number[] = [];
    for (const dia of diasDoMes) {
      let total = 0;
      for (const lancamento of lancamentos) {
        if (lancamento.day.getDate() === dia) {
          total = lancamento.amount;
          break;
        }
      }
      totais.push(total);
    }
    console.log(totais)
    return totais;
  }

  private configurarDiasMes() {
    // const mesReferencia = new Date();

    //Data estática
    const mesReferencia = new Date(2023, 5);
    mesReferencia.setMonth(mesReferencia.getMonth() + 1);
    mesReferencia.setDate(0);
    const quantidade = mesReferencia.getDate();
    const dias: number[] = [];
    for (let i = 1; i <= quantidade; i++) {
      dias.push(i);
    }
    return dias;
  }
}
