
import { Component, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cadastros',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css'
})
export class CadastrosComponent {

  @ViewChild(NgForm) formulario?: NgForm;

  cadastroSelecionado: string = 'produto';

  produto = {
    nome: '',
    categoria: '',
    quantidade: 0,
    preco: 0,
    data: '',
    descricao: ''
  };

  cliente = {
    nome: '',
    cpf: '',
    telefone: '',
    email: '',
    cidade: '',
    estado: ''
  };

  fornecedor = {
    nome: '',
    cnpj: '',
    telefone: '',
    email: '',
    endereco: ''
  };

  dadosConta = {
    nome: '',
    documento: '',
    email: '',
    senha: '',
    confirmarSenha: ''
  };

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  selecionarCadastro(tipo: string): void {
    this.cadastroSelecionado = tipo;
  }

  // CADASTRO DE CONTA NA API

  criarConta(): void {

    // Recupera os valores preenchidos no formulario
    const campos = this.formulario?.value ?? {};

    const nome = String(
      campos.nome || this.dadosConta.nome || ''
    ).trim();

    const email = String(
      campos.email || this.dadosConta.email || ''
    ).trim();

    const senha = String(
      campos.senha || this.dadosConta.senha || ''
    );

    const confirmarSenha = String(
      campos.confirmarSenha ||
      this.dadosConta.confirmarSenha || ''
    );

    const documento = String(
      campos.documento ||
      this.dadosConta.documento || ''
    ).replace(/\D/g, '');

    // Validacoes
    if (!nome || !email || !senha) {
      alert('Preencha nome, e-mail e senha!');
      return;
    }

    if (!documento) {
      alert('Preencha o CPF!');
      return;
    }

    if (senha.length < 8) {
      alert('A senha deve ter no minimo 8 caracteres!');
      return;
    }

    if (senha !== confirmarSenha) {
      alert('As senhas nao coincidem!');
      return;
    }

    // Dados enviados ao Spring Boot
    const novoCliente = {
      nome: nome,
      documento: documento,
      email: email,
      senha: senha
    };

    this.http.post(
      'http://localhost:8080/api/cliente',
      novoCliente,
      { responseType: 'text' }
    ).subscribe({

      next: () => {
        alert('Conta criada com sucesso!');

        this.dadosConta = {
          nome: '',
          documento: '',
          email: '',
          senha: '',
          confirmarSenha: ''
        };

        this.router.navigate(['/login']);
      },

      error: (erro) => {

        console.error('Erro ao cadastrar:', erro);

        if (erro.status === 0) {
          alert('Nao foi possivel conectar ao servidor.');
        }

        else if (erro.status === 400) {
          alert(
            typeof erro.error === 'string'
              ? erro.error
              : 'Verifique os dados informados.'
          );
        }

        else {
          alert('Erro ao cadastrar cliente!');
        }
      }

    });
  }

  // CADASTROS ADMINISTRATIVOS EXISTENTES

  cadastrarProduto(): void {
    console.log('Produto cadastrado:', this.produto);
    alert('Produto cadastrado com sucesso!');
  }

  cadastrarCliente(): void {
    console.log('Cliente cadastrado:', this.cliente);
    alert('Cliente cadastrado com sucesso!');
  }

  cadastrarFornecedor(): void {
    console.log('Fornecedor cadastrado:', this.fornecedor);
    alert('Fornecedor cadastrado com sucesso!');
  }

  limparProduto(): void {
    this.produto = {
      nome: '',
      categoria: '',
      quantidade: 0,
      preco: 0,
      data: '',
      descricao: ''
    };
  }

  limparCliente(): void {
    this.cliente = {
      nome: '',
      cpf: '',
      telefone: '',
      email: '',
      cidade: '',
      estado: ''
    };
  }

  limparFornecedor(): void {
    this.fornecedor = {
      nome: '',
      cnpj: '',
      telefone: '',
      email: '',
      endereco: ''
    };
  }
}
