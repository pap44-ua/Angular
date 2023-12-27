import { Routes } from '@angular/router';
import { ListaCompraComponent } from './lista-compra/lista-compra.component';

export const routes: Routes = [
    {
        path: '',
        component: ListaCompraComponent,
        title: 'Lista de la compra',
    }
];
