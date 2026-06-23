import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { LibrosService } from './../../../services/libros-service';

const URL_PATTERN = /^https?:\/\/.+\..+/;
const PLACEHOLDER = 'https://placehold.co/300x400?text=Sin+imagen';

@Component({
  selector: 'app-recursos-agregar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './recursos-agregar.html',
  styleUrl: './recursos-agregar.css',
})
export class RecursosAgregar {
  private fb      = inject(FormBuilder);
  private service = inject(LibrosService);
  private router  = inject(Router);

  isSubmitting = false;
  errorMessage = '';
  previewUrl   = PLACEHOLDER;

  form = this.fb.group({
    title:      ['', [Validators.required, Validators.minLength(2), Validators.maxLength(200)]],
    author:     ['', [Validators.required, Validators.maxLength(200)]],
    editor:     ['', [Validators.required, Validators.maxLength(100)]],
    synopsis:   ['', [Validators.required, Validators.maxLength(2000)]],
    adminScore: ['', [Validators.required]],
    coverImageUrl: ['', [Validators.pattern(URL_PATTERN)]],
  });

  get title()      { return this.form.get('title')!; }
  get author()     { return this.form.get('author')!; }
  get editor()     { return this.form.get('editor')!; }
  get synopsis()   { return this.form.get('synopsis')!; }
  get adminScore() { return this.form.get('adminScore')!; }
  get coverImageUrl() { return this.form.get('coverImageUrl')!; }

  onUrlChange(event: Event): void {
    const url = (event.target as HTMLInputElement).value.trim();
    this.previewUrl = url && URL_PATTERN.test(url) ? url : PLACEHOLDER;
  }

  onImageError(event: Event): void {
    (event.target as HTMLImageElement).src = PLACEHOLDER;
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    const { title, author, editor, synopsis, adminScore, coverImageUrl } = this.form.value;

    const payload = {
      title:      title!,
      author:     author!,
      editor:     editor!,
      synopsis:   synopsis!,
      adminScore: adminScore!,
      coverImageUrl: coverImageUrl || null,
    };

    this.service.create(payload).subscribe({
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
}
