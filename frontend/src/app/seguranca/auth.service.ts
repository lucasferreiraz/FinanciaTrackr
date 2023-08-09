import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { EMPTY, Observable, catchError, switchMap, throwError } from 'rxjs';
import { ErrorHandlerService } from '../core/error-handler.service';
import { Login } from '../core/model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  oauthTokenUrl = 'http://localhost:8080/auth/authenticate'
  refreshTokenUrl = 'http://localhost:8080/auth/refresh-token'
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

  armazenarToken(accessToken: string, refreshToken: string) {
    this.jwtPayload = this.jwtHelper.decodeToken(accessToken)
    localStorage.setItem('access_token', accessToken)
    localStorage.setItem('refresh_token', refreshToken)
  }

  carregarToken() {
    const accessToken = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');
    if (accessToken && refreshToken) {
      this.armazenarToken(accessToken, refreshToken);
    }
  }

  isAccessTokenInvalido() {
    const token = localStorage.getItem('access_token');
    return !token || this.jwtHelper.isTokenExpired(token);
  }

  obterNovoAccessToken(): Observable<void> {
    return this.http.post(this.refreshTokenUrl, {}).pipe(
      switchMap((response: any) => {
        const accessToken = response['access_token'];
        const refreshToken = response['refresh_token'];
        this.armazenarToken(accessToken, refreshToken);
        console.log('Novo access token criado!');
        return EMPTY; // Emitir um valor vazio para indicar conclusão
      }),
      catchError(error => {
        console.error('Erro ao renovar token.', error);
        return throwError(error);
      })
    );
  }

  temPermissao(permissao: string) {
    return this.jwtPayload && this.jwtPayload.roles.includes(permissao);
  }

  temQualquerPermissao(roles: any) {
    for (const role of roles) {
      if (this.temPermissao(role)) {
        return true;
      }
    }
    return false;
  }

  limparAccessToken () {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')

    this.jwtPayload = null;
  }

  errorRequestHandler(error: any) {
    if (error.status === 403)
      this.errorHandler.handle('Usuario ou senha inválidos!')
    else
      this.errorHandler.handle(error)
  }

}
