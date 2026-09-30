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
  MaintenanceCreate,
  MaintenanceService
} from '../Service/maintenance-service';

@Component({
  selector: 'app-maintenance-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './maintenance-form.html',
  styleUrl: './maintenance-form.css'
})
export class MaintenanceForm implements OnInit {

  maintenanceForm!: FormGroup;

  isEditMode = false;
  maintenanceId: number | null = null;

  loading = false;
  errorMessage = '';


  // =========================
  // Toast Signals
  // =========================

  toastMessage = signal('');

  toastType = signal<'success' | 'error'>('success');

  showToast = signal(false);


  constructor(
    private fb: FormBuilder,
    private maintenanceService: MaintenanceService,
    private router: Router,
    private route: ActivatedRoute
  ) {}


  ngOnInit(): void {

    this.createForm();

    const id =
      this.route.snapshot.paramMap.get('id');

    if (id) {

      this.isEditMode = true;
      this.maintenanceId = Number(id);

      this.loadMaintenance(
        this.maintenanceId
      );

    }

  }


  createForm(): void {

    this.maintenanceForm =
      this.fb.group({

        flatId: [
          '',
          [
            Validators.required,
            Validators.min(1)
          ]
        ],

        amount: [
          '',
          [
            Validators.required,
            Validators.min(0)
          ]
        ],

        month: [
          '',
          Validators.required
        ],

        dueDate: [
          '',
          Validators.required
        ],

        status: [
          'Pending',
          Validators.required
        ]

      });

  }


  loadMaintenance(id: number): void {

    this.loading = true;

    this.maintenanceService
      .getById(id)
      .subscribe({

        next: (maintenance) => {

          this.maintenanceForm.patchValue({

            flatId: maintenance.flatId,

            amount: maintenance.amount,

            month: this.formatDate(
              maintenance.month
            ),

            dueDate: this.formatDate(
              maintenance.dueDate
            ),

            status: maintenance.status

          });

          this.loading = false;

        },

        error: (error) => {

          console.error(error);

          this.errorMessage =
            'Unable to load maintenance record.';

          this.loading = false;

          this.showToastMessage(
            'Unable to load maintenance record.',
            'error'
          );

        }

      });

  }


  formatDate(date: string): string {

    return date
      ? date.substring(0, 10)
      : '';

  }


  saveMaintenance(): void {

    if (this.maintenanceForm.invalid) {

      this.maintenanceForm
        .markAllAsTouched();

      this.showToastMessage(
        'Please fill all required fields.',
        'error'
      );

      return;

    }


    this.loading = true;
    this.errorMessage = '';


    const maintenance:
      MaintenanceCreate =
      this.maintenanceForm.value;


    // =========================
    // Update
    // =========================

    if (
      this.isEditMode &&
      this.maintenanceId !== null
    ) {

      this.maintenanceService
        .update(
          this.maintenanceId,
          maintenance
        )
        .subscribe({

          next: () => {

            this.showToastMessage(
              'Maintenance record updated successfully.',
              'success'
            );

            setTimeout(() => {

              this.router.navigate([
                '/maintenance'
              ]);

            }, 1500);

          },

          error: (error) => {

            console.error(error);

            this.errorMessage =
              'Unable to update maintenance record.';

            this.loading = false;

            this.showToastMessage(
              'Unable to update maintenance record.',
              'error'
            );

          }

        });

    }


    // =========================
    // Create
    // =========================

    else {

      this.maintenanceService
        .create(maintenance)
        .subscribe({

          next: () => {

            this.showToastMessage(
              'Maintenance record created successfully.',
              'success'
            );

            setTimeout(() => {

              this.router.navigate([
                '/maintenance'
              ]);

            }, 1500);

          },

          error: (error) => {

            console.error(error);

            this.errorMessage =
              'Unable to create maintenance record.';

            this.loading = false;

            this.showToastMessage(
              'Unable to create maintenance record.',
              'error'
            );

          }

        });

    }

  }


  cancel(): void {

    this.router.navigate([
      '/maintenance'
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