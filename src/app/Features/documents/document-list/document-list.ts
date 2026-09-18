import {
  DatePipe
} from '@angular/common';

import {
  Component,
  OnInit,
  signal
} from '@angular/core';

import {
  RouterLink
} from '@angular/router';

import {
  DocumentService,
  ApartmentDocument
} from '../document.service';

@Component({
  selector: 'app-document-list',
  standalone: true,

  imports: [
    RouterLink,
    DatePipe
  ],

  templateUrl: './document-list.html',
  styleUrl: './document-list.css'
})
export class DocumentList implements OnInit {

  documents = signal<ApartmentDocument[]>([]);

  loading = signal(false);

  errorMessage = signal('');

  constructor(
    private documentService: DocumentService
  ) {}

  ngOnInit(): void {
    this.loadDocuments();
  }

  loadDocuments(): void {

    this.loading.set(true);

    this.errorMessage.set('');

    this.documentService
      .getAll()
      .subscribe({

        next: documents => {

          this.documents.set(documents);

          this.loading.set(false);
        },

        error: error => {

          console.error(error);

          this.errorMessage.set(
            'Unable to load documents.'
          );

          this.loading.set(false);
        }

      });
  }

  deleteDocument(id: number): void {

    if (
      !confirm(
        'Are you sure you want to delete this document?'
      )
    ) {
      return;
    }

    this.documentService
      .delete(id)
      .subscribe({

        next: () => {

          this.loadDocuments();
        },

        error: error => {

          console.error(error);

          alert('Delete failed.');
        }

      });
  }
}