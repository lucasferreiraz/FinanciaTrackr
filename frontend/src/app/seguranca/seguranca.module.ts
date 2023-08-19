import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule, HttpRequest } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { JWT_OPTIONS, JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { TooltipModule } from 'primeng/tooltip';
import { SharedModule } from '../shared/shared.module';
import { AppHttpInterceptor } from './app-http-interceptor';
import { LoginFormComponent } from './login-form/login-form.component';
import { SegurancaRoutingModule } from './seguranca-routing.module';

export function jwtOptionsFactory() {
  return {
    tokenGetter: (request: HttpRequest<any>) => {
      const currentUrl = request.url

      if (currentUrl.includes('/auth/refresh-token')) {
        return localStorage.getItem('refresh_token');
      }

      return localStorage.getItem('access_token');
    },
    allowedDomains: ['localhost:8080'],
    disallowedRoutes: ['http://localhost:8080/auth/authenticate']
  };
}

@NgModule({
  declarations: [
    LoginFormComponent
  ],
  imports: [
    CommonModule,
    SegurancaRoutingModule,

    FormsModule,
    RouterModule,
    InputTextModule,
    CardModule,
    ButtonModule,
    SharedModule,
    MessageModule,
    TooltipModule,
    HttpClientModule,
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
        deps: [HttpClient]
      },
    })
  ],
  providers: [
    JwtHelperService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppHttpInterceptor,
      multi: true,
    },
  ]
})
export class SegurancaModule { }
