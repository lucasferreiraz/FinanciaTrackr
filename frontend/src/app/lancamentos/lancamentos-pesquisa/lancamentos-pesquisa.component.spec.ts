import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LancamentosPesquisaComponent } from './lancamentos-pesquisa.component';

describe('LancamentosPesquisaComponent', () => {
  let component: LancamentosPesquisaComponent;
  let fixture: ComponentFixture<LancamentosPesquisaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LancamentosPesquisaComponent]
    });
    fixture = TestBed.createComponent(LancamentosPesquisaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
