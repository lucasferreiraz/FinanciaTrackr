import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  baseUrl = 'http://localhost:8080/categories';

  constructor(private http: HttpClient) { }

  pesquisarTodas(): Observable<any> {
    return this.http.get(`${this.baseUrl}`)
  }
}
