import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BookService } from 'src/app/services/book-service';
import { BookInterface } from 'src/app/models/book-interface';

@Component({
  selector: 'app-galeria',
  imports: [RouterLink],
  templateUrl: './galeria.html',
  styleUrl: './galeria.css',
})
export class Galeria {
  private bookService = inject(BookService);

  books = signal<BookInterface[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);

  ngOnInit() {
    this.bookService.listar().subscribe({
      next: (data) => {
        this.books.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('No se pudieron cargar los libros');
        this.loading.set(false);
      }
    });
  }
}
