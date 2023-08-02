import { HttpClient, HttpParams } from '@angular/common/http';
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

  pesquisarTodos(): Observable<any> {
    return this.http.get(`${this.baseUrl}`)
  }

  excluir(id: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`)
  }
}
