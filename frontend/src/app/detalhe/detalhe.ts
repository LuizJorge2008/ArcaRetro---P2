
import { CommonModule } from '@angular/common';
import {
  Component,
  ChangeDetectorRef,
  afterNextRender
} from '@angular/core';

import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CestaService } from '../cesta/cesta.service';

@Component({
  selector: 'app-detalhe',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './detalhe.html',
  styleUrl: './detalhe.css'
})
export class Detalhe {

  produto: any = {
    codigo: '',
    nome: 'Carregando produto...',
    categoria: '',
    descricao: '',
    descricaoCompleta: '',
    valor: 0,
    valorPromo: 0,
    imagem: '',
    disponibilidade: '',
    quantidade: 0
  };

  quantidade: number = 1;
  carregando: boolean = true;
  produtoEncontrado: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cestaService: CestaService,
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {
    afterNextRender(() => {
      this.carregarProduto();
    });
  }

  carregarProduto(): void {

    const codigo = Number(
      this.route.snapshot.paramMap.get('codigo')
    );

    this.http.get<any>(
      'http://localhost:8080/api/produto/' + codigo
    ).subscribe({

      next: (dados) => {

        this.produto = {
          ...dados,
          descricao: dados.descritivo || '',
          descricaoCompleta: dados.descritivo || '',
          valorPromo: dados.valorPromo ?? dados.valor,
          imagem: dados.imagem
            ? (dados.imagem.startsWith('http') ||
               dados.imagem.startsWith('/')
                ? dados.imagem.replace(/^\//, '')
                : dados.imagem)
            : '',
          disponibilidade: dados.quantidade > 0
            ? 'Disponível em estoque'
            : 'Indisponível'
        };

        this.produtoEncontrado = true;
        this.carregando = false;
        this.cdr.markForCheck();
      },

      error: () => {
        this.produto.nome = 'Produto não encontrado';
        this.produto.disponibilidade = 'Indisponível';
        this.carregando = false;
        this.produtoEncontrado = false;
        this.cdr.markForCheck();
      }

    });
  }

  aumentarQuantidade(): void {
    if (this.quantidade < this.produto.quantidade) {
      this.quantidade++;
    }
  }

  diminuirQuantidade(): void {
    if (this.quantidade > 1) {
      this.quantidade--;
    }
  }

  adicionarCesta(): void {

    if (!this.produtoEncontrado ||
        this.produto.quantidade < this.quantidade) {
      alert('Produto indisponível!');
      return;
    }

    this.cestaService.adicionarProduto(
      this.produto,
      this.quantidade
    );

    alert(
      `${this.produto.nome} foi adicionado à cesta!`
    );
  }

  comprarAgora(): void {

    if (!this.produtoEncontrado ||
        this.produto.quantidade < this.quantidade) {
      alert('Produto indisponível!');
      return;
    }

    this.cestaService.adicionarProduto(
      this.produto,
      this.quantidade
    );

    this.router.navigate(['/cesta']);
  }
}
