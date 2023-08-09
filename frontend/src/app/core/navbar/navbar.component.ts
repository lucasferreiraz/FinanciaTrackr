import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/seguranca/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  usuarioLogado: string = ''
  exibindoMenu: boolean = true

  constructor(
    private auth: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.usuarioLogado = this.auth.jwtPayload.name
  }

  temPermissao(permissao: string): boolean {
    return this.auth.temPermissao(permissao);
  }

  logout() {
    this.auth.limparAccessToken()
    this.router.navigate(['/login'])
  }
}
