import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';

import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ErrorHandlerService } from './error-handler.service';



@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ToastModule,
    ConfirmDialogModule
  ],
  exports: [
    NavbarComponent,
    ToastModule,
    ConfirmDialogModule
  ],
  providers: [
    DatePipe,
    ConfirmationService,
    MessageService,
    ErrorHandlerService
  ]
})
export class CoreModule { }
