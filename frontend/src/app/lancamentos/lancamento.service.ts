import { DatePipe } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export class LancamentoFiltro {
  description!: string
  minDueDate?: Date
  maxDueDate?: Date
  pagina = 0
  itensPorPagina = 5
}

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  baseUrl = 'http://localhost:8080/expenditures'

  constructor(
    private http: HttpClient,
    private datePipe: DatePipe
  ) { }

  pesquisar(filtro: LancamentoFiltro): Observable<any> {
    let params = new HttpParams()

    params = params.set('page', filtro.pagina)
    params = params.set('size', filtro.itensPorPagina)

    if (filtro.description)
      params = params.set('description', filtro.description)

    if (filtro.minDueDate)
      params = params.set('minDueDate', this.datePipe.transform(filtro.minDueDate, 'yyyy-MM-dd')!);

    if (filtro.maxDueDate)
      params = params.set('maxDueDate', this.datePipe.transform(filtro.maxDueDate, 'yyyy-MM-dd')!);

    return this.http.get(`${this.baseUrl}?resume`, { params })
  }

}
