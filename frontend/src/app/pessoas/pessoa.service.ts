import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cidade, Estado, Pessoa } from '../core/model';

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

  cidadesUrl = 'http://localhost:8080/cities'
  estadosUrl = 'http://localhost:8080/states'

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


  buscaPorId (id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`)
  }

  mudarStatus(id: number, ativo: boolean): Observable<any> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json')

    return this.http.put(`${this.baseUrl}/${id}/active`, ativo, { headers })
  }

  adicionar(pessoa: Pessoa): Observable<Pessoa> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');

    return this.http.post<Pessoa>(`${this.baseUrl}`, pessoa, { headers })
  }

  atualizar(pessoa: Pessoa): Observable<Pessoa> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');

    return this.http.put<Pessoa>(`${this.baseUrl}/${pessoa.id}`,
      pessoa, { headers })
  }

  excluir(id: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`)
  }


  listarEstados(): Observable<Estado[]> {
    return this.http.get<Estado[]>(this.estadosUrl)
  }

  pesquisarCidades(estadoId: number): Observable<Cidade[]> {
    let params = new HttpParams()
    params = params.set('stateId', estadoId)
    return this.http.get<Cidade[]>(this.cidadesUrl, { params })
  }
}
