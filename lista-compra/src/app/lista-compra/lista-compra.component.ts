import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Item } from '../item';
import { ClientApiService } from '../client-api.service';

@Component({
  selector: 'app-lista-compra',
  standalone: true,
  imports: [CommonModule],
  template: `
  <!-- En tu template HTML -->
  <ul>
    <li *ngFor="let item of items" (click)="toggleCompra(item)">
      <span [class.tachado]="item.comprado">{{ item.nombre }}</span>
    </li>
  </ul>

  `,
  styleUrl: './lista-compra.component.css'
})
export class ListaCompraComponent {
  items: Item[] = []
  api: ClientApiService = inject(ClientApiService);

  constructor() {
    this.api.getItems().then((items: Item[]) => {
      this.items = items
    });
  }
  toggleCompra(item: Item): void {
    item.comprado = !item.comprado;
  }
}
