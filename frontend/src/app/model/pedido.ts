import { ItemPedido } from './item-pedido';

export class Pedido {

    codigo: number = 0;

    itens: ItemPedido[] = [];

    valorTotal: number = 0;

    status: string = "";

}