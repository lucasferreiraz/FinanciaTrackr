import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export class PessoaFiltro {
  name: string = '';
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  baseUrl = 'http://localhost:8080/persons'

  constructor(
    private http: HttpClient
  ) { }

  pesquisar(filtro: PessoaFiltro): Observable<any> {
    let params = new HttpParams()

    params = params.set('page', filtro.pagina)
    params = params.set('size', filtro.itensPorPagina)

    if (filtro.name)
      params = params.set('name', filtro.name)

    return this.http.get(`${this.baseUrl}`, { params })
  }

  pesquisarTodas(): Observable<any> {
    return this.http.get(`${this.baseUrl}`)
  }

  mudarStatus(id: number, ativo: boolean): Observable<any> {
    let headers = new HttpHeaders()

    headers = headers.append('Content-Type', 'application/json')

    return this.http.put(`${this.baseUrl}/${id}/active`, ativo, { headers })
  }


  excluir(id: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`)
  }
}
