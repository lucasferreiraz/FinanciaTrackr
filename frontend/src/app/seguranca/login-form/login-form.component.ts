import { Component } from '@angular/core';
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
    public authService: AuthService) { }

  login(email: string, senha: string) {
    this.authService.login(email, senha)
      .subscribe(data => {
        this.authService.armazenarToken(data['access_token'], data['refresh_token'])
        this.router.navigate(['/dashboard'])
      },
      error => this.authService.errorRequestHandler(error))
  }
}
