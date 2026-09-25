
import {
  Component,
  OnInit,
  signal
} from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import {
  ActivatedRoute,
  Router
} from '@angular/router';

import {
  DocumentService
} from '../document.service';

import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-document-form',

  standalone: true,

  imports: [
    ReactiveFormsModule
  ],

  templateUrl: './document-form.html',

  styleUrl: './document-form.css'
})
export class DocumentForm implements OnInit {


  documentForm: FormGroup;


  isEdit = signal(false);

  loading = signal(false);

  errorMessage = signal('');


  documentId = 0;


  selectedFile: File | null = null;


  constructor(
    private fb: FormBuilder,

    private documentService: DocumentService,

    private route: ActivatedRoute,

    private router: Router,

    private toastr: ToastrService
  ) {


    this.documentForm = this.fb.group({

      title: [
        '',
        Validators.required
      ],

      description: [
        '',
        Validators.required
      ],

      status: [
        1
      ]

    });

  }


  ngOnInit(): void {

    const id =
      this.route.snapshot.paramMap.get('id');


    if (id) {

      this.documentId = Number(id);

      this.isEdit.set(true);

      this.loadDocument(
        this.documentId
      );

    }

  }


  // LOAD EXISTING DOCUMENT

  loadDocument(
    id: number
  ): void {

    this.loading.set(true);


    this.documentService
      .getById(id)
      .subscribe({

        next: document => {

          this.documentForm.patchValue({

            title: document.title,

            description: document.description,

            status: document.status

          });


          this.loading.set(false);

        },


        error: error => {

          console.error(error);


          this.errorMessage.set(
            'Unable to load document.'
          );


          this.loading.set(false);

          this.toastr.error(
            'Unable to load document.',
            'Error'
          );

        }

      });

  }


  // SELECT PDF FILE

  onFileSelected(
    event: Event
  ): void {

    const input =
      event.target as HTMLInputElement;


    if (
      !input.files ||
      input.files.length === 0
    ) {

      this.selectedFile = null;

      return;

    }


    const file =
      input.files[0];


    // CHECK PDF

    if (
      file.type !== 'application/pdf'
    ) {

      this.errorMessage.set(
        'Please select a PDF file.'
      );

      this.toastr.error(
        'Please select a PDF file.',
        'Invalid File'
      );

      this.selectedFile = null;

      input.value = '';

      return;

    }


    this.selectedFile = file;

    this.errorMessage.set('');

  }


  // SAVE DOCUMENT

  saveDocument(): void {


    if (
      this.documentForm.invalid
    ) {

      this.documentForm.markAllAsTouched();

      return;

    }


    this.errorMessage.set('');


    // CREATE

    if (!this.isEdit()) {


      // PDF REQUIRED FOR NEW DOCUMENT

      if (!this.selectedFile) {

        this.errorMessage.set(
          'Please select a PDF file.'
        );

        this.toastr.error(
          'Please select a PDF file.',
          'File Required'
        );

        return;

      }


      this.loading.set(true);


      const title =
        this.documentForm.value.title;


      const description =
        this.documentForm.value.description;


      const uploadedBy =
        Number(
          localStorage.getItem('userId') || 1
        );


      this.documentService
        .create(
          title,
          description,
          this.selectedFile,
          uploadedBy
        )
        .subscribe({

          next: () => {

            this.toastr.success(
              'Document uploaded successfully.',
              'Success'
            );

            this.router.navigate([
              '/documents'
            ]);

          },


          error: error => {

            console.error(error);

            this.errorMessage.set(
              'Unable to upload document.'
            );

            this.loading.set(false);

            this.toastr.error(
              'Unable to upload document.',
              'Error'
            );

          }

        });

    }


    // UPDATE

    else {


      this.loading.set(true);


      const title =
        this.documentForm.value.title;


      const description =
        this.documentForm.value.description;


      const status =
        Number(
          this.documentForm.value.status
        );


      this.documentService
        .update(
          this.documentId,
          title,
          description,
          status,
          this.selectedFile || undefined
        )
        .subscribe({

          next: () => {

            this.toastr.success(
              'Document updated successfully.',
              'Success'
            );

            this.router.navigate([
              '/documents'
            ]);

          },


          error: error => {

            console.error(error);

            this.errorMessage.set(
              'Unable to update document.'
            );

            this.loading.set(false);

            this.toastr.error(
              'Unable to update document.',
              'Error'
            );

          }

        });

    }

  }


  // CANCEL

  cancel(): void {

    this.router.navigate([
      '/documents'
    ]);

  }

}

