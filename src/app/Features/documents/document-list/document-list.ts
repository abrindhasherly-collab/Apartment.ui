import { DatePipe } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  DocumentService,
  ApartmentDocument
} from '../document.service';
import { ToastrService } from 'ngx-toastr';

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
    private documentService: DocumentService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadDocuments();
  }

  loadDocuments(): void {
    this.loading.set(true);
    this.errorMessage.set('');

    this.documentService.getAll().subscribe({
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

        this.toastr.error(
          'Unable to load documents.',
          'Error'
        );
      }
    });
  }

  // ==========================================
  // OPEN DOCUMENT
  // ==========================================

  openDocument(filePath: string): void {

    if (!filePath) {
      this.toastr.error(
        'Document file is not available.',
        'Error'
      );
      return;
    }

    let fileUrl = filePath;

    // If backend returns only a relative path
    if (!filePath.startsWith('http')) {

      fileUrl =
        `https://localhost:7202/${filePath.replace(/^\/+/, '')}`;
    }

    console.log('Opening document:', fileUrl);

    window.open(fileUrl, '_blank');
  }

  // ==========================================
  // DELETE DOCUMENT
  // ==========================================

  deleteDocument(id: number): void {

    if (
      !confirm(
        'Are you sure you want to delete this document?'
      )
    ) {
      return;
    }

    this.documentService.delete(id).subscribe({

      next: () => {

        this.toastr.success(
          'Document deleted successfully.',
          'Success'
        );

        this.loadDocuments();
      },

      error: error => {

        console.error(error);

        this.toastr.error(
          'Delete failed.',
          'Error'
        );
      }
    });
  }
}