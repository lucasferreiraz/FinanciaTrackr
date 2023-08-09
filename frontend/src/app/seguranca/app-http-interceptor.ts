import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service'; // Importe seu serviço AuthService

export class NotAuthenticatedError {}

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (this.auth.isAccessTokenInvalido() && !request.url.includes('/auth/authenticate')) {
          // Token inválido, tentar renovar
          return this.auth.obterNovoAccessToken().pipe(
            switchMap(() => {
              // Reenviar a solicitação original com o novo token
              const newHeaders = request.headers
                .set('Authorization', `Bearer ${localStorage.getItem('access_token')}`);

              const newRequest = request.clone({ headers: newHeaders });
              return next.handle(newRequest);
            }),
            catchError(() => {
              // Se a renovação falhar, redirecionar para login ou realizar outra ação
              // Você pode implementar sua lógica aqui, por exemplo, redirecionar para a página de login
              throw new NotAuthenticatedError();
              // return throwError('Falha na renovação do token');
            })
          );
        } else {
          // Outro erro, repassar o erro original
          return throwError(error);
        }
      })
    );
  }
}
