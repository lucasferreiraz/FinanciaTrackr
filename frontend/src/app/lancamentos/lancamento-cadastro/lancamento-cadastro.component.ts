import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoriaService } from 'src/app/categorias/categoria.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  tipos = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' },
  ];

  categorias = [];

  pessoas = [
    { label: 'Alberto Nunes de Souza', value: 1 },
    { label: 'Gilbeto Souza Maior', value: 2 },
    { label: 'João Souza Santos', value: 3 },
  ];

  constructor(
    private route: ActivatedRoute,
    private categoriaService: CategoriaService,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit():void {
    this.carregarCategorias()
  }

  carregarCategorias() {
    return this.categoriaService.pesquisarTodas()
      .subscribe(categorias => {
        this.categorias = categorias.map((c:any) => ({ label: c.name, value: c.id }));
      },
      error => this.errorHandler.handle(error))
  }

}
