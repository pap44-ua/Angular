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
    <li *ngFor="let item of items">
      <div *ngIf="editandoId!=item.id" (click)="toggleCompra(item)">
        <span [class.tachado]="item.comprado">{{ item.nombre }}</span>
        <button (click)="eliminarItem(item.id)">Eliminar</button>
        <button (click)="editarItem(item.id)">Editar</button>
      </div>
      <div *ngIf="editandoId==item.id">
        <input type="text" id="nombreItemEditar" placeholder="Nuevo nombre" (input)="onInputChangeEditar($event)" />
        <button (click)="editandoItem(item.id)">Guardar</button>
      </div>
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
  nombreItemEditar = '';
  editandoId = -1;
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
  onInputChangeEditar(event: any): void {
    // Manejar el cambio en el input
    this.nombreItemEditar = event.target.value;
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

  async editarItem(itemId: number): Promise<void> {
    this.editandoId = itemId;
  }

  async editandoItem(itemId: number): Promise<void> {
    if (this.nombreItemEditar.trim() !== '') {
      const exito = await this.api.editItem(itemId, this.nombreItemEditar, false);

      if (exito) {
        // Actualiza la lista después de editar el producto
        this.items = this.items.map(item => {
          if (item.id === itemId) {
            item.nombre = this.nombreItemEditar;
          }
          return item;
        });
        this.editandoId = -1;
      } else {
        // Maneja el caso en que la edición no sea exitosa
        console.error('Error al editar el producto.');
      }
    } else {
      // Manejar caso en que el nombre del ítem es vacío
      console.error('Nombre del nuevo ítem no puede estar vacío.');
    }
  }
}
