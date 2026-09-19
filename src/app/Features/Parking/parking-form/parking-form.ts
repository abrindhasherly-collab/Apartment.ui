import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';

import { ParkingCreate, ParkingService, ParkingUpdate } from '../Service/parking-service';
// import {
//   ParkingCreate,
//   ParkingUpdate
// } from '../../models/parking.model';

@Component({
  selector: 'app-parking-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './parking-form.html',
  styleUrl: './parking-form.css'
})
export class ParkingForm implements OnInit {

  parkingForm!: FormGroup;

  isEditMode = false;
  parkingId!: number;

  constructor(
    private fb: FormBuilder,
    private parkingService: ParkingService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.parkingForm = this.fb.group({

      slotNumber: [
        '',
        [
          Validators.required,
          Validators.maxLength(20)
        ]
      ],

      vehicleNumber: [
        '',
        Validators.maxLength(20)
      ],

      flatId: [
        null
      ],

      vehicleType: [
        ''
      ],

      status: [
        'Available',
        Validators.required
      ]

    });


    const id = this.route.snapshot.paramMap.get('id');

    if (id) {

      this.isEditMode = true;
      this.parkingId = Number(id);

      this.loadParking(this.parkingId);
    }
  }


  loadParking(id: number): void {

    this.parkingService.getById(id).subscribe({

      next: (parking) => {

        this.parkingForm.patchValue({

          slotNumber: parking.slotNumber,

          vehicleNumber: parking.vehicleNumber,

          flatId: parking.flatId,

          vehicleType: parking.vehicleType,

          status: parking.status

        });

      },

      error: (error) => {

        console.error('Error loading parking:', error);

        alert('Unable to load parking details.');

        this.router.navigate(['/parking']);

      }

    });

  }


  saveParking(): void {

    if (this.parkingForm.invalid) {

      this.parkingForm.markAllAsTouched();

      return;
    }


    const formValue = this.parkingForm.value;


    if (this.isEditMode) {

      const parking: ParkingUpdate = {

        slotNumber: formValue.slotNumber,

        vehicleNumber: formValue.vehicleNumber || undefined,

        flatId: formValue.flatId || undefined,

        vehicleType: formValue.vehicleType || undefined,

        status: formValue.status

      };


      this.parkingService
        .update(this.parkingId, parking)
        .subscribe({

          next: () => {

            alert('Parking updated successfully.');

            this.router.navigate(['/parking']);

          },

          error: (error) => {

            console.error('Error updating parking:', error);

            alert('Unable to update parking.');

          }

        });

    }

    else {

      const parking: ParkingCreate = {

        slotNumber: formValue.slotNumber,

        vehicleNumber: formValue.vehicleNumber || undefined,

        flatId: formValue.flatId || undefined,

        vehicleType: formValue.vehicleType || undefined,

        status: formValue.status

      };


      this.parkingService
        .create(parking)
        .subscribe({

          next: () => {

            alert('Parking added successfully.');

            this.router.navigate(['/parking']);

          },

          error: (error) => {

            console.error('Error creating parking:', error);

            alert('Unable to add parking.');

          }

        });

    }

  }


  cancel(): void {

    this.router.navigate(['/parking']);

  }

}