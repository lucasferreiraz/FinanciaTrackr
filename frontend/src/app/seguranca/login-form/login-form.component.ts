import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/core/model';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {

  formLogin = new Login();

  constructor(
    private router: Router,
    private authService: AuthService) { }

  login(email: string, senha: string) {
    this.authService.login(email, senha)
      .subscribe(data => {
        console.log(data)
      })
  }
}
