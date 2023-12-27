import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ListaCompraComponent } from './lista-compra/lista-compra.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ListaCompraComponent],
  template: `
  <main>
    <header>
      <h1>Lista de la compra</h1>
    </header>
    <section>
      <app-lista-compra></app-lista-compra>
    </section>
  </main>
  `,
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'lista-compra';
}
