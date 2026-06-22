import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AfinidadService } from '../../../services/afinidad-service';
import { AfinidadFila, RatingCrudo } from '../../../models/afinidad-model';

interface AffinityData {
  titulo: string;
  lector: string;
  suRating: number;
  miRating: number;
}

@Component({
  selector: 'app-afinidad',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './afinidad.html',
  styleUrl: './afinidad.css',
})
export class Afinidad implements OnInit {
  private afinidadService = inject(AfinidadService);

  filas   = signal<AfinidadFila[]>([]);
  loading = signal(true);
  error   = signal<string | null>(null);

  ngOnInit() {
    this.afinidadService.getAffinityTable().subscribe({
      next: (filas) => {
        this.filas.set(filas);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Error al cargar las afinidades');
        this.loading.set(false);
      },
    });
  }

  stars(score: number): boolean[] {
    return Array.from({ length: 5 }, (_, i) => i < score);
  }
}
