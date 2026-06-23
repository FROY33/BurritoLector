import { Component, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { LibrosService } from './../../../services/libros-service';

@Component({
  selector: 'app-recursos-agregar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './recursos-agregar.html',
  styleUrl: './recursos-agregar.css',
})
export class RecursosAgregar implements OnDestroy {
  private fb      = inject(FormBuilder);
  private service = inject(LibrosService);
  private router  = inject(Router);

  isSubmitting = false;
  errorMessage = '';
  previewUrl   = 'https://placehold.co/300x400?text=Sin+imagen';

  selectedFile: File | null = null;
  private objectUrl: string | null = null;

  form = this.fb.group({
    title:      ['', [Validators.required, Validators.minLength(2), Validators.maxLength(200)]],
    author:     ['', [Validators.required, Validators.maxLength(200)]],
    editor:     ['', [Validators.required, Validators.maxLength(100)]],
    synopsis:   ['', [Validators.required, Validators.maxLength(2000)]],
    adminScore: ['', [Validators.required]],
  });

  get title()      { return this.form.get('title')!; }
  get author()     { return this.form.get('author')!; }
  get editor()     { return this.form.get('editor')!; }
  get synopsis()   { return this.form.get('synopsis')!; }
  get adminScore() { return this.form.get('adminScore')!; }

  triggerFilePicker(input: HTMLInputElement): void {
    input.click();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file  = input.files?.[0];
    if (!file) return;

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      this.errorMessage = 'Solo se permiten imágenes JPG, PNG o WEBP.';
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      this.errorMessage = 'La imagen no debe superar los 5 MB.';
      return;
    }

    this.errorMessage = '';
    this.selectedFile = file;

    if (this.objectUrl) URL.revokeObjectURL(this.objectUrl);
    this.objectUrl = URL.createObjectURL(file);
    this.previewUrl = this.objectUrl;
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    const { title, author, editor, synopsis, adminScore } = this.form.value;

    const formData = new FormData();
    formData.append('title',      title!);
    formData.append('author',     author!);
    formData.append('editor',     editor!);
    formData.append('synopsis',   synopsis!);
    formData.append('adminScore', adminScore!);

    if (this.selectedFile) {
      formData.append('coverImage', this.selectedFile);
    }

    this.service.create(formData).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.router.navigate(['/burritoadministrador/recursos']);
      },
      error: (err) => {
        this.isSubmitting = false;
        this.errorMessage = err?.error?.message ?? 'Error al guardar el libro. Intenta de nuevo.';
      },
    });
  }

  ngOnDestroy(): void {
    if (this.objectUrl) URL.revokeObjectURL(this.objectUrl);
  }
}
