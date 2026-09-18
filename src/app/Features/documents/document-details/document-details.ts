import {
  DatePipe
} from '@angular/common';
import {
  Component,
  OnInit,
  signal
} from '@angular/core';

import {
  ActivatedRoute,
  Router,
  RouterLink
} from '@angular/router';

import {
  DocumentService,
  ApartmentDocument
} from '../document.service';

@Component({
  selector: 'app-document-details',
  standalone: true,
  imports: [
    RouterLink,DatePipe
  ],
  templateUrl: './document-details.html',
  styleUrl: './document-details.css'
})
export class DocumentDetails implements OnInit {

  document = signal<ApartmentDocument | null>(null);

  loading = signal(false);

  errorMessage = signal('');

  constructor(
    private route: ActivatedRoute,
    private documentService: DocumentService,
    private router: Router
  ) {}

  ngOnInit(): void {

    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.loadDocument(id);
  }

  loadDocument(id: number): void {

    this.loading.set(true);

    this.documentService
      .getById(id)
      .subscribe({

        next: data => {

          this.document.set(data);

          this.loading.set(false);

        },

        error: error => {

          console.error(error);

          this.errorMessage.set(
            'Document not found.'
          );

          this.loading.set(false);

        }

      });
  }

  deleteDocument(): void {

    const data = this.document();

    if (!data) {
      return;
    }

    if (
      !confirm(
        'Are you sure you want to delete this document?'
      )
    ) {
      return;
    }

    this.documentService
      .delete(data.id)
      .subscribe({

        next: () => {

          this.router.navigate([
            '/documents'
          ]);

        },

        error: error => {

          console.error(error);

          this.errorMessage.set(
            'Unable to delete document.'
          );

        }

      });
  }
}