import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders(
  { 'Content-Type': 'application/pdf'}),
  params: {},
  responseType: 'blob' as 'json'
};

@Injectable({
  providedIn: 'root'
})
export class RelatoriosService {

  baseUrl = 'http://localhost:8080/expenditures'

  constructor(
    private http: HttpClient,
    private datePipe: DatePipe
  ) { }

  relatorioLancamentosPorPessoa(startDate: Date, endDate: Date): Observable<any> {
    httpOptions.params = new HttpParams()
      .append('startDate', this.datePipe.transform(startDate, 'yyyy-MM-dd')!)
      .append('endDate', this.datePipe.transform(endDate, 'yyyy-MM-dd')!);

    return this.http.get(`${this.baseUrl}/reports/by-person`, httpOptions)
  }
}
