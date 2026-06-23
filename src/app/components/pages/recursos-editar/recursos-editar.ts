import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { LibrosService } from './../../../services/libros-service';

const URL_PATTERN = /^https?:\/\/.+\..+/;
const PLACEHOLDER = 'https://placehold.co/300x400?text=Sin+imagen';

@Component({
  selector: 'app-recursos-editar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './recursos-editar.html',
  styleUrl: './recursos-editar.css',
})
export class RecursosEditar implements OnInit, OnDestroy {
  private fb      = inject(FormBuilder);
  private service = inject(LibrosService);
  private router  = inject(Router);
  private route   = inject(ActivatedRoute);

  isSubmitting = false;
  isLoading    = true;
  errorMessage = '';
  previewUrl   = 'https://placehold.co/300x400?text=Sin+imagen';
  private libroId!: number;
  
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

  ngOnInit(): void {
    this.libroId = Number(this.route.snapshot.paramMap.get('id'));
    this.service.findOne(this.libroId).subscribe({
      next: (libro) => {
        this.form.patchValue({
          title:      libro.title,
          author:     libro.author      ?? '',
          editor:     libro.editor      ?? '',
          synopsis:   libro.synopsis    ?? '',
          adminScore: String(libro.adminScore ?? ''),
          coverImageUrl: libro.coverImageUrl ?? '',
        });
        if (libro.coverImageUrl) {
          this.previewUrl = libro.coverImageUrl;
        }
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Error al cargar el libro.';
        this.isLoading = false;
      },
    });
  }

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

    const { title, author, editor, synopsis, adminScore,  coverImageUrl } = this.form.value;

    this.service.update(this.libroId, {
       title:         title!,
       author:        author!,
       editor:        editor!,
       synopsis:      synopsis!,
       adminScore:    adminScore!,
       coverImageUrl: coverImageUrl || null,
     }).subscribe({
       next: () => {
         this.isSubmitting = false;
         this.router.navigate(['/burritoadministrador/recursos']);
       },
       error: (err) => {
         this.isSubmitting = false;
         this.errorMessage = err?.error?.message ?? 'Error al actualizar el libro.';
       },
     });
   }

  ngOnDestroy(): void {
    if (this.objectUrl) URL.revokeObjectURL(this.objectUrl);
  }
}
