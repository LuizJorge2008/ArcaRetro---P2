
import { CommonModule } from '@angular/common';
import {
  Component,
  ChangeDetectorRef,
  afterNextRender
} from '@angular/core';

import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { forkJoin, timeout } from 'rxjs';

interface ItemPedidoAPI {
  produtoCodigo: number;
  quantidade: number;
  precoUnitario: number;
}

interface PedidoAPI {
  codigoPedido: number;
  clienteCodigo: number;
  status: string;
  total: number | null;
  itens: ItemPedidoAPI[];
}

interface ProdutoAPI {
  codigo: number;
  nome: string;
  imagem: string | null;
}

interface ProdutoPedido {
  nome: string;
  quantidade: number;
  valor: number;
  imagem: string;
}

interface PedidoTela {
  codigo: string;
  data: string;
  status: string;
  total: number | null;
  produtos: ProdutoPedido[];
}

@Component({
  selector: 'app-lista-pedidos',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './lista-pedidos.html',
  styleUrl: './lista-pedidos.css'
})
export class ListaPedidos {

  pedidos: PedidoTela[] = [];
  pedidoSelecionado: PedidoTela | null = null;

  carregando = true;
  mensagem = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {

    // Executa somente no navegador
    afterNextRender(() => {
      this.carregarPedidos();
    });
  }

  carregarPedidos(): void {

    const clienteSalvo =
      sessionStorage.getItem('clienteArca');

    if (!clienteSalvo) {
      this.mensagem = 'Faça login para visualizar seus pedidos.';
      this.carregando = false;
      this.cdr.markForCheck();
      return;
    }

    let codigoCliente: number;

    try {
      const cliente = JSON.parse(clienteSalvo);
      codigoCliente = Number(cliente.codigo);

      if (!Number.isInteger(codigoCliente) ||
          codigoCliente <= 0) {
        throw new Error('Cliente inválido');
      }

    } catch {
      this.mensagem = 'Faça login novamente.';
      this.carregando = false;
      this.cdr.markForCheck();
      return;
    }

    this.carregando = true;
    this.mensagem = '';

    forkJoin({

      pedidos: this.http.get<PedidoAPI[]>(
        'http://localhost:8080/api/pedidos/cliente/' +
        codigoCliente
      ),

      produtos: this.http.get<ProdutoAPI[]>(
        'http://localhost:8080/api/produtos'
      )

    }).pipe(
      timeout(10000)
    ).subscribe({

      next: ({ pedidos, produtos }) => {

        const produtosPorCodigo = new Map(
          produtos.map(produto => [
            produto.codigo,
            produto
          ])
        );

        this.pedidos = pedidos.map(pedido => ({

          codigo: 'PED-' +
            String(pedido.codigoPedido).padStart(3, '0'),

          data: 'Não registrada',

          status: pedido.status || 'Pendente',

          total: pedido.total == null
            ? null
            : Number(pedido.total),

          produtos: (pedido.itens || []).map(item => {

            const produto = produtosPorCodigo.get(
              item.produtoCodigo
            );

            const imagem = produto?.imagem || '';

            return {
              nome: produto?.nome ||
                'Produto ' + item.produtoCodigo,

              quantidade: item.quantidade,

              valor: Number(item.precoUnitario),

              imagem: imagem
                ? (
                    imagem.startsWith('http') ||
                    imagem.startsWith('/')
                      ? imagem
                      : '/' + imagem
                  )
                : ''
            };
          })
        }));

        this.carregando = false;

        // Atualiza a tela depois da resposta HTTP
        this.cdr.markForCheck();
      },

      error: (erro) => {

        console.error('Erro ao carregar pedidos:', erro);

        this.carregando = false;

        if (erro.name === 'TimeoutError') {
          this.mensagem =
            'O servidor demorou para responder.';
        } else {
          this.mensagem =
            'Não foi possível carregar seus pedidos.';
        }

        this.cdr.markForCheck();
      }

    });
  }

  visualizarPedido(pedido: PedidoTela): void {
    this.pedidoSelecionado = pedido;
  }

  fecharDetalhes(): void {
    this.pedidoSelecionado = null;
  }

  continuarComprando(): void {
    this.router.navigate(['/vitrine']);
  }
}
