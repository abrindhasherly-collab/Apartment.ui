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
  NoticeService
} from '../notice.service';

@Component({
  selector: 'app-notice-form',
  standalone: true,

  imports: [
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
        }

      });
  }

  saveNotice(): void {

    if (this.noticeForm.invalid) {

      this.noticeForm.markAllAsTouched();

      return;
    }

    this.loading.set(true);

    if (this.isEdit()) {

      const updateData = {

        title: this.noticeForm.value.title,

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

            this.router.navigate(['/notices']);
          },

          error: error => {

            console.error(error);

            this.errorMessage.set(
              'Unable to update notice.'
            );

            this.loading.set(false);
          }

        });

    } else {

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

            this.router.navigate(['/notices']);
          },

          error: error => {

            console.error(error);

            this.errorMessage.set(
              'Unable to create notice.'
            );

            this.loading.set(false);
          }

        });
    }
  }

  cancel(): void {

    this.router.navigate(['/notices']);
  }
}