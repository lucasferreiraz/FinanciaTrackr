import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from '../core/model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  oauthTokenUrl = 'http://localhost:8080/auth/authenticate'

  constructor(private http: HttpClient) { }

  login(usuario: string, senha: string): Observable<any> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json')

    const body: Login = {
      email: usuario,
      password: senha
    }

    return this.http.post(this.oauthTokenUrl, body, { headers })
  }
}
