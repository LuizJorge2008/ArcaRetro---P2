
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CestaService } from './cesta.service';

@Component({
  selector: 'app-cesta',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cesta.html',
  styleUrl: './cesta.css'
})
export class Cesta {

  finalizando = false;

  constructor(
    public cestaService: CestaService,
    private http: HttpClient,
    private router: Router
  ) {}

  aumentarQuantidade(codigo: number): void {
    this.cestaService.aumentarQuantidade(codigo);
  }

  diminuirQuantidade(codigo: number): void {
    this.cestaService.diminuirQuantidade(codigo);
  }

  removerProduto(codigo: number): void {
    this.cestaService.removerProduto(codigo);
  }

  calcularSubtotal(): number {
    return this.cestaService.calcularSubtotal();
  }

  calcularFrete(): number {
    return this.cestaService.calcularFrete();
  }

  calcularTotal(): number {
    return this.cestaService.calcularTotal();
  }

  finalizarCompra(): void {

    if (this.finalizando) {
      return;
    }

    // Verificar se existe um cliente logado
    const clienteSalvo = sessionStorage.getItem('clienteArca');

    if (!clienteSalvo) {
      alert('Faca login antes de finalizar a compra!');
      this.router.navigate(['/login']);
      return;
    }

    let codigoCliente: number;

    try {
      const cliente = JSON.parse(clienteSalvo);
      codigoCliente = Number(cliente.codigo);

      if (!Number.isInteger(codigoCliente) ||
          codigoCliente <= 0) {
        throw new Error('Cliente invalido');
      }
    } catch {
      sessionStorage.removeItem('clienteArca');
      alert('Sessao invalida. Faca login novamente.');
      this.router.navigate(['/login']);
      return;
    }

    // Verificar a cesta
    if (this.cestaService.produtos.length === 0) {
      alert('Sua cesta esta vazia!');
      return;
    }

    // Preparar os produtos do pedido
    const itens = this.cestaService.produtos.map(produto => ({
      produtoCodigo: produto.codigo,
      quantidade: produto.quantidade
    }));

    // Preparar o pedido para o Spring Boot
    const novoPedido = {
      clienteCodigo: codigoCliente,
      itens: itens
    };

    this.finalizando = true;

    // Enviar o pedido para o PostgreSQL
    this.http.post<{
      codigoPedido: number;
      total: number;
      status: string;
    }>(
      'http://localhost:8080/api/pedido',
      novoPedido
    ).subscribe({

      next: (pedido) => {

        this.finalizando = false;

        alert(
          'Pedido nº ' + pedido.codigoPedido +
          ' registrado com sucesso!\nTotal: ' +
          Number(pedido.total).toLocaleString(
            'pt-BR',
            { style: 'currency', currency: 'BRL' }
          )
        );

        // Limpar a cesta apos registrar o pedido
        this.cestaService.produtos = [];

        this.router.navigate(['/vitrine']);
      },

      error: (erro) => {

        this.finalizando = false;

        console.error('Erro ao finalizar pedido:', erro);

        if (erro.status === 0) {
          alert('Nao foi possivel conectar ao servidor.');
        } else {
          alert(
            typeof erro.error === 'string'
              ? erro.error
              : 'Erro ao registrar o pedido!'
          );
        }
      }

    });

  }
}
