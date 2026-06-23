import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { LibrosService } from './../../../services/libros-service';
import { Libro } from './../../../models/libro-model';

@Component({
  selector: 'app-recursos-eliminar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './recursos-eliminar.html',
  styleUrl: './recursos-eliminar.css',
})
export class RecursosEliminar implements OnInit {
  private service = inject(LibrosService);
  private router  = inject(Router);
  private route   = inject(ActivatedRoute);

  isLoading    = true;
  isDeleting   = false;
  errorMessage = '';
  libro: Libro | null = null;
  private libroId!: number;

  ngOnInit(): void {
    this.libroId = Number(this.route.snapshot.paramMap.get('id'));
    this.service.findOne(this.libroId).subscribe({
      next: (libro) => {
        this.libro    = libro;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Error al cargar el libro.';
        this.isLoading    = false;
      },
    });
  }

  onEliminar(): void {
    this.isDeleting  = true;
    this.errorMessage = '';

    this.service.remove(this.libroId).subscribe({
      next: () => {
        this.router.navigate(['/burritoadministrador/recursos']);
      },
      error: (err) => {
        this.isDeleting  = false;
        this.errorMessage = err?.error?.message ?? 'Error al eliminar el libro.';
      },
    });
  }

  onCancelar(): void {
    this.router.navigate(['/burritoadministrador/recursos']);
  }
}
