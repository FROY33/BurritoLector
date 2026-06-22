import { Component, inject, signal, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LibrosService } from 'src/app/services/libros-service';
import { Libro } from 'src/app/models/libro-model';

@Component({
  selector: 'app-recursos',
  imports: [RouterLink],
  templateUrl: './recursos.html',
  styleUrl: './recursos.css',
})
export class Recursos implements OnInit {
  private librosService = inject(LibrosService);

  libros = signal<Libro[]>([]);
  loading = signal(true);

  ngOnInit() {
    this.librosService.findAll({ page: 1, limit: 100 }).subscribe({
      next: (res) => {
        this.libros.set(res.data);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }
}
