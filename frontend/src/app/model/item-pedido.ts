import { Produto } from './produto';

export class ItemPedido {

    codigo: number = 0;

    produto: Produto = new Produto();

    quantidade: number = 0;

    valor: number = 0;

}