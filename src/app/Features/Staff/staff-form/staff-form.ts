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

import { StaffCreate, StaffService, StaffUpdate } from '../Service/staff-service';

// import {
//   StaffCreate,
//   StaffUpdate
// } from '../../models/staff.model';

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

  staffForm!: FormGroup;

  isEditMode = false;
  staffId!: number;


  constructor(
    private fb: FormBuilder,
    private staffService: StaffService,
    private route: ActivatedRoute,
    private router: Router
  ) {}


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


  loadStaff(id: number): void {

    this.staffService.getById(id).subscribe({

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

        alert('Unable to load staff details.');

        this.router.navigate(['/staff']);

      }

    });

  }


  saveStaff(): void {

    if (this.staffForm.invalid) {

      this.staffForm.markAllAsTouched();

      return;

    }


    const formValue = this.staffForm.value;


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

            alert(
              'Staff updated successfully.'
            );

            this.router.navigate([
              '/staff'
            ]);

          },

          error: (error) => {

            console.error(
              'Error updating staff:',
              error
            );

            alert(
              'Unable to update staff.'
            );

          }

        });

    }

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

            alert(
              'Staff added successfully.'
            );

            this.router.navigate([
              '/staff'
            ]);

          },

          error: (error) => {

            console.error(
              'Error creating staff:',
              error
            );

            alert(
              'Unable to add staff.'
            );

          }

        });

    }

  }


  formatDate(date: string): string {

    return date
      ? date.substring(0, 10)
      : '';

  }


  cancel(): void {

    this.router.navigate([
      '/staff'
    ]);

  }

}