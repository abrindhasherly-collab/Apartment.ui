import { Component, OnInit } from '@angular/core';
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

import { MaintenanceCreate, MaintenanceService } from '../Service/maintenance-service';
// import { MaintenanceCreate } from '../../models/maintenance.model';

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

      return;

    }

    this.loading = true;
    this.errorMessage = '';

    const maintenance:
      MaintenanceCreate =
      this.maintenanceForm.value;


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

            this.router.navigate([
              '/maintenance'
            ]);

          },

          error: (error) => {

            console.error(error);

            this.errorMessage =
              'Unable to update maintenance record.';

            this.loading = false;

          }

        });

    } else {

      this.maintenanceService
        .create(maintenance)
        .subscribe({

          next: () => {

            this.router.navigate([
              '/maintenance'
            ]);

          },

          error: (error) => {

            console.error(error);

            this.errorMessage =
              'Unable to create maintenance record.';

            this.loading = false;

          }

        });

    }

  }

  cancel(): void {

    this.router.navigate([
      '/maintenance'
    ]);

  }
}