import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
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
  private cdr     = inject(ChangeDetectorRef);

  isLoading    = true;
  isDeleting   = false;
  errorMessage = '';
  libro: Libro | null = null;
  private libroId!: number;

  ngOnInit(): void {
    this.libroId = Number(this.route.snapshot.paramMap.get('id'));
    console.log('libroId:', this.libroId);
    
    this.service.findOne(this.libroId).subscribe({
      next: (libro) => {
        console.log('libro cargado:', libro);
        this.libro    = libro;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log('error:', err);
        this.errorMessage = 'Error al cargar el libro.';
        this.isLoading    = false;
        this.cdr.detectChanges();
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
