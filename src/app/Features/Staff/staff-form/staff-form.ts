import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

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
  StaffCreate,
  StaffService,
  StaffUpdate
} from '../Service/staff-service';


@Component({
  selector: 'app-staff-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './staff-form.html',
  styleUrl: './staff-form.css'
})
export class StaffForm implements OnInit {

  // =========================
  // Form
  // =========================

  staffForm!: FormGroup;

  isEditMode = false;

  staffId!: number;


  // =========================
  // Toast Signals
  // =========================

  toastMessage = signal('');

  toastType = signal<'success' | 'error'>('success');

  showToast = signal(false);


  constructor(
    private fb: FormBuilder,
    private staffService: StaffService,
    private route: ActivatedRoute,
    private router: Router
  ) {}


  // =========================
  // On Init
  // =========================

  ngOnInit(): void {

    this.staffForm = this.fb.group({

      name: [
        '',
        [
          Validators.required,
          Validators.maxLength(100)
        ]
      ],

      phone: [
        '',
        [
          Validators.required,
          Validators.maxLength(15)
        ]
      ],

      jobRole: [
        '',
        [
          Validators.required,
          Validators.maxLength(50)
        ]
      ],

      joiningDate: [
        '',
        Validators.required
      ],

      status: [
        'Active',
        Validators.required
      ]

    });


    const id = this.route.snapshot.paramMap.get('id');


    if (id) {

      this.isEditMode = true;

      this.staffId = Number(id);

      this.loadStaff(this.staffId);

    }

  }


  // =========================
  // Load Staff
  // =========================

  loadStaff(id: number): void {

    this.staffService
      .getById(id)
      .subscribe({

        next: (staff) => {

          this.staffForm.patchValue({

            name: staff.name,

            phone: staff.phone,

            jobRole: staff.jobRole,

            joiningDate: this.formatDate(
              staff.joiningDate
            ),

            status: staff.status

          });

        },

        error: (error) => {

          console.error(
            'Error loading staff:',
            error
          );


          this.showToastMessage(
            'Unable to load staff details.',
            'error'
          );


          setTimeout(() => {

            this.router.navigate([
              '/staff'
            ]);

          }, 2000);

        }

      });

  }


  // =========================
  // Save Staff
  // =========================

  saveStaff(): void {

    if (this.staffForm.invalid) {

      this.staffForm.markAllAsTouched();

      this.showToastMessage(
        'Please fill all required fields.',
        'error'
      );

      return;

    }


    const formValue = this.staffForm.value;


    // =========================
    // UPDATE
    // =========================

    if (this.isEditMode) {

      const staff: StaffUpdate = {

        name: formValue.name,

        phone: formValue.phone,

        jobRole: formValue.jobRole,

        joiningDate: formValue.joiningDate,

        status: formValue.status

      };


      this.staffService
        .update(this.staffId, staff)
        .subscribe({

          next: () => {

            this.showToastMessage(
              'Staff updated successfully.',
              'success'
            );


            setTimeout(() => {

              this.router.navigate([
                '/staff'
              ]);

            }, 1500);

          },

          error: (error) => {

            console.error(
              'Error updating staff:',
              error
            );


            this.showToastMessage(
              'Unable to update staff.',
              'error'
            );

          }

        });

    }


    // =========================
    // CREATE
    // =========================

    else {

      const staff: StaffCreate = {

        name: formValue.name,

        phone: formValue.phone,

        jobRole: formValue.jobRole,

        joiningDate: formValue.joiningDate,

        status: formValue.status

      };


      this.staffService
        .create(staff)
        .subscribe({

          next: () => {

            this.showToastMessage(
              'Staff added successfully.',
              'success'
            );


            setTimeout(() => {

              this.router.navigate([
                '/staff'
              ]);

            }, 1500);

          },

          error: (error) => {

            console.error(
              'Error creating staff:',
              error
            );


            this.showToastMessage(
              'Unable to add staff.',
              'error'
            );

          }

        });

    }

  }


  // =========================
  // Format Date
  // =========================

  formatDate(date: string): string {

    return date
      ? date.substring(0, 10)
      : '';

  }


  // =========================
  // Cancel
  // =========================

  cancel(): void {

    this.router.navigate([
      '/staff'
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