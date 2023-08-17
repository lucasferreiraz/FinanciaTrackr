import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Contato } from 'src/app/core/model';

@Component({
  selector: 'app-pessoas-cadastro-contato',
  templateUrl: './pessoas-cadastro-contato.component.html',
  styleUrls: ['./pessoas-cadastro-contato.component.css']
})
export class PessoasCadastroContatoComponent {

  @Input() contatos!: Array<Contato>
  contato!: Contato
  contatoIndex!: number;
  exibirFormularioContato: boolean = false;

  confirmarContato(formContato: NgForm) {
    this.contatos[this.contatoIndex] = this.clonarContato(this.contato);
    this.exibirFormularioContato = false;
    formContato.reset();
  }

  editarContato(contato: Contato, index: number) {
    this.contato = this.clonarContato(contato);
    this.exibirFormularioContato = true;
    this.contatoIndex = index;
  }

  removerContato(index: number) {
    this.contatos.splice(index, 1)
  }

  clonarContato(contato: Contato): Contato {
    return new Contato(contato.id, contato.name, contato.email, contato.phone);
  }

  abrirModalContato() {
    this.exibirFormularioContato = true;
    this.contato = new Contato();
    this.contatoIndex = this.contatos.length
  }

  get editando() {
    return this.contato.id && this.contato
  }
}
