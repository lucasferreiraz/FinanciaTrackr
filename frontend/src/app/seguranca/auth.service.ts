import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from '../core/model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ErrorHandlerService } from '../core/error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  oauthTokenUrl = 'http://localhost:8080/auth/authenticate'
  jwtPayload: any

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private errorHandler: ErrorHandlerService) {

    this.carregarToken()
  }

  login(usuario: string, senha: string): Observable<any> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json')

    const body: Login = {
      email: usuario,
      password: senha
    }

    return this.http.post(this.oauthTokenUrl, body, { headers })
  }

  armazenarToken(token: string) {
    this.jwtPayload = this.jwtHelper.decodeToken(token)
    localStorage.setItem('token', token)
  }

  carregarToken() {
    const token = localStorage.getItem('token');
    if (token) {
      this.armazenarToken(token);
    }
  }

  errorRequestHandler(error: any) {
    if (error.status === 403)
      this.errorHandler.handle('Usuario ou senha inválidos!')
    else
      this.errorHandler.handle(error)
  }

}
