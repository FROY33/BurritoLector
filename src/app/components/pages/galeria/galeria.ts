import { Component, inject, signal, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Libro } from 'src/app/models/libro-model';
import { LibrosService } from 'src/app/services/libros-service';

@Component({
  selector: 'app-galeria',
  imports: [RouterLink],
  templateUrl: './galeria.html',
  styleUrl: './galeria.css',
})
export class Galeria implements OnInit {
  private librosService = inject(LibrosService);

  libros = signal<Libro[]>([]);
  loading = signal(true);
  page = signal(1);
  limit = signal(10);
  total = signal(0);
  lastPage = signal(1);

  ngOnInit(): void {
    this.cargarLibros();
  }

  cargarLibros(): void {
    this.loading.set(true);
    this.librosService.findAll({ page: this.page(), limit: this.limit() }).subscribe({
      next: (res) => {
        this.libros.set(res.data);
        this.total.set(res.total);
        this.lastPage.set(res.lastPage);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error al cargar libros', err);
        this.loading.set(false);
      }
    });
  }

  siguientePagina(): void {
    if (this.page() < this.lastPage()) {
      this.page.update(p => p + 1);
      this.cargarLibros();
    }
  }

  paginaAnterior(): void {
    if (this.page() > 1) {
      this.page.update(p => p - 1);
      this.cargarLibros();
    }
  }

  truncar(texto: string | undefined, max = 100): string {
    if (!texto) return '';
    return texto.length > max ? texto.slice(0, max) + '...' : texto;
  }
}
