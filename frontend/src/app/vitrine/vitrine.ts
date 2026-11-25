
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CestaService } from '../cesta/cesta.service';

interface ProdutoAPI {
  codigo: number;
  nome: string;
  descritivo: string | null;
  categoria: string | null;
  imagem: string | null;
  valor: number;
  valorPromo: number | null;
  quantidade: number;
  destaque: number | null;
}

@Component({
  selector: 'app-vitrine',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './vitrine.html',
  styleUrl: './vitrine.css'
})
export class Vitrine implements OnInit {

  categoriaSelecionada: string = 'Todos';

  produtos: any[] = [];

  categorias: string[] = ['Todos'];

  constructor(
    private cestaService: CestaService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.carregarProdutos();
  }

  carregarProdutos(): void {

    this.http.get<ProdutoAPI[]>(
      'http://localhost:8080/api/produtos'
    ).subscribe({

      next: (dados) => {

        this.produtos = dados.map(produto => ({
          codigo: produto.codigo,
          nome: produto.nome,
          descricao: produto.descritivo || '',
          categoria: produto.categoria || 'Sem categoria',
          imagem: produto.imagem || '',
          valor: produto.valor,
          valorPromo: produto.valorPromo ?? produto.valor,
          quantidade: produto.quantidade,
          destaque: produto.destaque === 1
        }));

        this.categorias = [
          'Todos',
          ...new Set(
            this.produtos.map(produto => produto.categoria)
          )
        ];

      },

      error: (erro) => {
        console.error('Erro ao carregar produtos:', erro);
        alert('Não foi possível carregar os produtos.');
      }

    });
  }

  selecionarCategoria(categoria: string): void {
    this.categoriaSelecionada = categoria;
  }

  produtosFiltrados() {

    if (this.categoriaSelecionada === 'Todos') {
      return this.produtos;
    }

    return this.produtos.filter(
      produto => produto.categoria === this.categoriaSelecionada
    );
  }

  adicionarCesta(produto: any): void {

    this.cestaService.adicionarProduto(produto);

    alert(`${produto.nome} foi adicionado à cesta!`);
  }
}
