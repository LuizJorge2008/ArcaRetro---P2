
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {

  email: string = '';
  password: string = '';
  rememberMe: boolean = false;
  showPassword: boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  login(): void {

    if (!this.email || !this.password) {
      alert('Preencha todos os campos.');
      return;
    }

    this.http.post<{ codigo: number; nome: string; email: string }>(
      'http://localhost:8080/api/cliente/login',
      {
        email: this.email,
        senha: this.password
      }
    ).subscribe({

      next: (cliente) => {

      // Guarda o cliente durante esta sessao do navegador
      sessionStorage.setItem(
        'clienteArca',
        JSON.stringify(cliente)
      );

      alert('Bem-vindo, ' + cliente.nome + '!');

      this.router.navigate(['/vitrine']);
    },

      error: (erro) => {
        if (erro.status === 401) {
          alert('E-mail ou senha incorretos!');
        } else {
          alert('Erro ao conectar com o servidor!');
        }
      }

    });

  }
}
