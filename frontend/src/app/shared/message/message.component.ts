import { Component, Input, OnInit } from '@angular/core';
import { FormControl, NgModel } from '@angular/forms';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent {


  @Input() error: string = '';
  @Input() control!: NgModel;
  @Input() text: string = '';

  temErro(): boolean | null {
    return this.control.hasError(this.error) && this.control.dirty;
  }
}
