import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/seguranca/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  usuarioLogado: string = ''
  exibindoMenu: boolean = false

  menuItens: MenuItem[] = [
    {
      label: 'Dashboard',
      icon: 'pi pi-fw pi-chart-pie',
      routerLink: '/dashboard',
      visible: this.temPermissao('ROLE_SEARCH_EXPENDITURE'),
      command: () => { this.toggleMenu() }
    },
    {
      label: 'Lançamentos',
      icon: 'pi pi-fw pi-money-bill',
      routerLink: '/lancamentos',
      visible: this.temPermissao('ROLE_SEARCH_EXPENDITURE'),
      command: () => { this.toggleMenu() }
    },
    {
      label: 'Pessoas',
      icon: 'pi pi-fw pi-users',
      routerLink: '/pessoas',
      visible: this.temPermissao('ROLE_SEARCH_PERSON'),
      command: () => { this.toggleMenu() }
    },
    {
      label: 'Relatórios',
      icon: 'pi pi-fw pi-file-pdf',
      routerLink: '/relatorios/lancamentos',
      visible: this.temPermissao('ROLE_SEARCH_EXPENDITURE'),
      command: () => { this.toggleMenu() }
    }
  ];

  constructor(
    private auth: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.usuarioLogado = this.auth.jwtPayload.name
  }

  temPermissao(permissao: string): boolean {
    return this.auth.temPermissao(permissao);
  }

  toggleMenu() {
    this.exibindoMenu = !this.exibindoMenu
  }

  logout() {
    this.router.navigate(['/login'])
    this.auth.limparAccessToken()
  }
}
