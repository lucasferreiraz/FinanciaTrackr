import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  baseUrl = 'http://localhost:8080/expenditures'

  constructor(
    private http: HttpClient
  ) { }

  pesquisar(): Observable<any> {
    return this.http.get(`${this.baseUrl}?resume`)
  }
}
