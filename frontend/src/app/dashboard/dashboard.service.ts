import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  baseUrl = 'http://localhost:8080/expenditures'

  constructor(private http: HttpClient) { }

  lancamentosPorCategoria(): Observable<any> {
    return this.http.get(`${this.baseUrl}/statistics/by-category`)
  }

  lancamentosPorDia(): Observable<any> {
    return this.http.get(`${this.baseUrl}/statistics/by-day`)
  }

  converterStringsParaDatas(dados: any[]) {
    for (const dado of dados) {
      dado.day = new Date(dado.day);
    }
  }
}
