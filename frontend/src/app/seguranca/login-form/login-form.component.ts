import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/core/model';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {

  formLogin = new Login();

  constructor(private router: Router) { }

  login(form: NgForm) {
    this.router.navigate(['lancamentos/']);
  }
}
