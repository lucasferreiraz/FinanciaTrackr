import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessageComponent } from './message/message.component';
import { MessageModule } from 'primeng/message';



@NgModule({
  declarations: [
    MessageComponent
  ],
  imports: [
    CommonModule,
    MessageModule
  ],
  exports: [
    MessageComponent
  ]
})
export class SharedModule { }
