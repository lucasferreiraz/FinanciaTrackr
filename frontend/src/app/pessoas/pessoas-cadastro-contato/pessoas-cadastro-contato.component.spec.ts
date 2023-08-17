import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PessoasCadastroContatoComponent } from './pessoas-cadastro-contato.component';

describe('PessoasCadastroContatoComponent', () => {
  let component: PessoasCadastroContatoComponent;
  let fixture: ComponentFixture<PessoasCadastroContatoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PessoasCadastroContatoComponent]
    });
    fixture = TestBed.createComponent(PessoasCadastroContatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
