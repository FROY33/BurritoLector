import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { DashService } from 'src/app/services/dash-service';
import { DashInterface } from 'src/app/models/dash-interface';
import { forkJoin } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dash',
  imports: [CommonModule],
  templateUrl: './dash.html',
  styleUrl: './dash.css',
})
export class Dash implements OnInit{

  dashModel = signal<DashInterface>({
    lectores: 0,
    libros: 0,
    promedio_rating: 0,
  });

  constructor(private dashService: DashService, private router: Router) {
    
  }

  ngOnInit() {
    this.mostrarDatos();
  }

  mostrarDatos() {
    forkJoin({
      libros: this.dashService.obtenerNumeroLibros(),
      lectores: this.dashService.obtenerNumeroLectores(),
      promedio: this.dashService.obtenerPromedioRating(),
    }).subscribe(res => {

      this.dashModel.set({
        libros: res.libros.data.total,
        lectores: res.lectores.data.total,
        promedio_rating: res.promedio.data.average
      });

    });
  }
}
