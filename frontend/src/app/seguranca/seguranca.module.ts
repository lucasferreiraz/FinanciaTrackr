import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './login-form/login-form.component';
import { SegurancaRoutingModule } from './seguranca-routing.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { SharedModule } from '../shared/shared.module';
import { MessageModule } from 'primeng/message';
import { TooltipModule } from 'primeng/tooltip';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';



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
    ButtonModule,
    SharedModule,
    MessageModule,
    TooltipModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => { return ''}
      }
    })
  ],
  providers: [
    JwtHelperService
  ]
})
export class SegurancaModule { }