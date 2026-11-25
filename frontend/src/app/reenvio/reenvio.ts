
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-reenvio',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './reenvio.html',
  styleUrl: './reenvio.css'
})
export class Reenvio {

  email: string = '';
  mensagem: string = '';
  enviado: boolean = false;

  enviarLink(): void {

    if (this.email.trim() === '') {
      this.mensagem = 'Digite seu e-mail para continuar.';
      this.enviado = false;
      return;
    }

    this.mensagem =
      'Se este e-mail estiver cadastrado, enviaremos um link para redefinir sua senha.';

    this.enviado = true;
  }
}
