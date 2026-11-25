import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CestaService {

  produtos: any[] = [];

  adicionarProduto(produto: any, quantidade: number = 1): void {

    const produtoExistente = this.produtos.find(
      item => item.codigo === produto.codigo
    );

    if (produtoExistente) {

      produtoExistente.quantidade += quantidade;

    } else {

      this.produtos.push({
        ...produto,
        quantidade: quantidade
      });

    }
  }

  removerProduto(codigo: number): void {

    this.produtos = this.produtos.filter(
      produto => produto.codigo !== codigo
    );

  }

  aumentarQuantidade(codigo: number): void {

    const produto = this.produtos.find(
      item => item.codigo === codigo
    );

    if (produto) {
      produto.quantidade++;
    }

  }

  diminuirQuantidade(codigo: number): void {

    const produto = this.produtos.find(
      item => item.codigo === codigo
    );

    if (produto && produto.quantidade > 1) {
      produto.quantidade--;
    }

  }

  calcularSubtotal(): number {

    return this.produtos.reduce(
      (total, produto) =>
        total + (produto.valorPromo * produto.quantidade),
      0
    );

  }

  calcularFrete(): number {

    return this.produtos.length > 0 ? 29.90 : 0;

  }

  calcularTotal(): number {

    return this.calcularSubtotal() + this.calcularFrete();

  }
}