import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { CadastrosComponent } from './cadastros.component';

describe('CadastrosComponent', () => {

  let component: CadastrosComponent;
  let fixture: ComponentFixture<CadastrosComponent>;


  beforeEach(async () => {

    await TestBed.configureTestingModule({

      declarations: [
        CadastrosComponent
      ],

      imports: [
        FormsModule
      ]

    }).compileComponents();

  });


  beforeEach(() => {

    fixture = TestBed.createComponent(CadastrosComponent);

    component = fixture.componentInstance;

    fixture.detectChanges();

  });


  it('deve criar o componente', () => {

    expect(component).toBeTruthy();

  });


  it('deve iniciar com produto selecionado', () => {

    expect(component.cadastroSelecionado)
      .toBe('produto');

  });


  it('deve selecionar produto', () => {

    component.selecionarCadastro('produto');

    expect(component.cadastroSelecionado)
      .toBe('produto');

  });


  it('deve selecionar cliente', () => {

    component.selecionarCadastro('cliente');

    expect(component.cadastroSelecionado)
      .toBe('cliente');

  });


  it('deve selecionar fornecedor', () => {

    component.selecionarCadastro('fornecedor');

    expect(component.cadastroSelecionado)
      .toBe('fornecedor');

  });


  it('deve limpar produto', () => {

    component.produto.nome = 'Relógio antigo';
    component.produto.quantidade = 10;
    component.produto.preco = 1500;

    component.limparProduto();

    expect(component.produto.nome).toBe('');
    expect(component.produto.quantidade).toBe(0);
    expect(component.produto.preco).toBe(0);

  });


  it('deve limpar cliente', () => {

    component.cliente.nome = 'João Silva';
    component.cliente.email = 'joao@email.com';

    component.limparCliente();

    expect(component.cliente.nome).toBe('');
    expect(component.cliente.email).toBe('');

  });


  it('deve limpar fornecedor', () => {

    component.fornecedor.nome = 'Antique Imports';
    component.fornecedor.cnpj = '00.000.000/0000-00';

    component.limparFornecedor();

    expect(component.fornecedor.nome).toBe('');
    expect(component.fornecedor.cnpj).toBe('');

  });

});