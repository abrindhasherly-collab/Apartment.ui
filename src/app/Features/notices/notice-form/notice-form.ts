import { NoticeService } from '../notice.service';
import { CommonModule } from '@angular/common';

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

@Component({
  selector: 'app-notice-form',
  standalone: true,

  imports: [
    CommonModule,
    ReactiveFormsModule
  ],

  templateUrl: './notice-form.html',
  styleUrl: './notice-form.css'
})
export class NoticeForm implements OnInit {

  noticeForm: FormGroup;

  isEdit = signal(false);

  loading = signal(false);

  errorMessage = signal('');

  noticeId = 0;


  // Toast Signals
  toastMessage = signal('');

  toastType = signal<'success' | 'error'>('success');

  showToast = signal(false);


  constructor(
    private fb: FormBuilder,
    private noticeService: NoticeService,
    private route: ActivatedRoute,
    private router: Router
  ) {

    this.noticeForm = this.fb.group({

      title: [
        '',
        Validators.required
      ],

      description: [
        '',
        Validators.required
      ],

      postedBy: [
        1,
        Validators.required
      ],

      status: [
        2
      ]

    });

  }


  ngOnInit(): void {

    const id =
      this.route.snapshot.paramMap.get('id');

    if (id) {

      this.noticeId = Number(id);

      this.isEdit.set(true);

      this.loadNotice(this.noticeId);

    }

  }


  loadNotice(id: number): void {

    this.loading.set(true);

    this.noticeService
      .getById(id)
      .subscribe({

        next: data => {

          this.noticeForm.patchValue(data);

          this.loading.set(false);

        },

        error: error => {

          console.error(error);

          this.errorMessage.set(
            'Unable to load notice.'
          );

          this.loading.set(false);

          this.showToastMessage(
            'Unable to load notice.',
            'error'
          );

        }

      });

  }


  saveNotice(): void {

    if (this.noticeForm.invalid) {

      this.noticeForm.markAllAsTouched();

      this.showToastMessage(
        'Please fill all required fields.',
        'error'
      );

      return;

    }

    this.loading.set(true);


    // =========================
    // Update Notice
    // =========================

    if (this.isEdit()) {

      const updateData = {

        title:
          this.noticeForm.value.title,

        description:
          this.noticeForm.value.description,

        status:
          this.noticeForm.value.status

      };


      this.noticeService
        .update(
          this.noticeId,
          updateData
        )
        .subscribe({

          next: () => {

            this.showToastMessage(
              'Notice updated successfully.',
              'success'
            );

            setTimeout(() => {

              this.router.navigate([
                '/notices'
              ]);

            }, 1500);

          },

          error: error => {

            console.error(error);

            this.errorMessage.set(
              'Unable to update notice.'
            );

            this.loading.set(false);

            this.showToastMessage(
              'Unable to update notice.',
              'error'
            );

          }

        });

    }


    // =========================
    // Create Notice
    // =========================

    else {

      const createData = {

        title:
          this.noticeForm.value.title,

        description:
          this.noticeForm.value.description,

        postedBy:
          this.noticeForm.value.postedBy,

        status:
          this.noticeForm.value.status

      };


      this.noticeService
        .create(createData)
        .subscribe({

          next: () => {

            this.showToastMessage(
              'Notice created successfully.',
              'success'
            );

            setTimeout(() => {

              this.router.navigate([
                '/notices'
              ]);

            }, 1500);

          },

          error: error => {

            console.error(error);

            this.errorMessage.set(
              'Unable to create notice.'
            );

            this.loading.set(false);

            this.showToastMessage(
              'Unable to create notice.',
              'error'
            );

          }

        });

    }

  }


  cancel(): void {

    this.router.navigate([
      '/notices'
    ]);

  }


  // =========================
  // Toast
  // =========================

  showToastMessage(
    message: string,
    type: 'success' | 'error'
  ): void {

    this.toastMessage.set(message);

    this.toastType.set(type);

    this.showToast.set(true);


    setTimeout(() => {

      this.showToast.set(false);

    }, 3000);

  }

}