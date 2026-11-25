import { Routes } from '@angular/router';
import { CadastrosComponent } from './cadastro/cadastro';
import { Cesta } from './cesta/cesta'; 
import { Detalhe } from './detalhe/detalhe'; 
import { ListaPedidos } from './lista-pedidos/lista-pedidos'; 
import { LoginComponent } from './login/login'; 
import { Pedido } from './pedido/pedido';
import { Reenvio } from './reenvio/reenvio'; 
import { ResultaBusca } from './resulta-busca/resulta-busca'; 
import { Vitrine } from './vitrine/vitrine';

export const routes: Routes = [
    {path:'cadastro', component:CadastrosComponent},
    {path:"cesta", component:Cesta},
    {path:"detalhe/:codigo", component:Detalhe}, 
    {path:"lista-pedidos", component:ListaPedidos}, 
    {path:"login", component:LoginComponent}, 
    {path:"pedido", component:Pedido}, 
    {path:"reenvio",component:Reenvio}, 
    {path:"resulta-busca", component:ResultaBusca}, 
    {path:"vitrine",component:Vitrine}, 
    {path:"", component:Vitrine}
];
