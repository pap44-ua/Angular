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
      <button (click)="eliminarItem(item.id)">Eliminar</button>
    </li>
  </ul>
  <div>
      <input type="text" id="nuevoItemNombre" placeholder="Nuevo item" (input)="onInputChange($event)" />
      <button (click)="agregarItem()">Agregar</button>
    </div>


  `,
  styleUrl: './lista-compra.component.css'
})
export class ListaCompraComponent {
  items: Item[] = []
  nuevoItemNombre = '';
  api: ClientApiService = inject(ClientApiService);

  constructor() {
    this.api.getItems().then((items: Item[]) => {
      this.items = items
    });
  }
  toggleCompra(item: Item): void {
    item.comprado = !item.comprado;
  }
  async eliminarItem(itemId: number): Promise<void> {
    const confirmacion = confirm(`¿Seguro que deseas eliminar el producto?`);

    if (confirmacion) {
      const exito = await this.api.delItem(itemId);

      if (exito) {
        // Actualiza la lista después de eliminar el producto
        this.items = this.items.filter(item => item.id !== itemId);
      } else {
        // Maneja el caso en que la eliminación no sea exitosa
        console.error('Error al eliminar el producto.');
      }
    }
  }
  onInputChange(event: any): void {
    // Manejar el cambio en el input
    this.nuevoItemNombre = event.target.value;
  }

  async agregarItem(): Promise<void> {
    if (this.nuevoItemNombre.trim() !== '') {
      const nuevoItem = await this.api.addItem(this.nuevoItemNombre);

      // Agregar el nuevo ítem a la lista
      this.items.push(nuevoItem);

      // Limpiar el campo de entrada después de agregar el ítem
      this.nuevoItemNombre = '';
    } else {
      // Manejar caso en que el nombre del ítem es vacío
      console.error('Nombre del nuevo ítem no puede estar vacío.');
    }
  }
}
