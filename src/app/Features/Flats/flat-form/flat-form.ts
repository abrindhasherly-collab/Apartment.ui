import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { FlatCreate, FlatService } from '../Service/flat-service';
// import { FlatCreate } from '../../models/flat.model';

@Component({
  selector: 'app-flat-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './flat-form.html',
  styleUrl: './flat-form.css'
})
export class FlatForm implements OnInit {

  flatForm!: FormGroup;

  isEditMode = false;
  flatId: number | null = null;

  loading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private flatService: FlatService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    this.createForm();

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.isEditMode = true;
      this.flatId = Number(id);
      this.loadFlat(this.flatId);
    }
  }

  createForm(): void {

    this.flatForm = this.fb.group({

      flatNumber: [
        '',
        [Validators.required, Validators.maxLength(20)]
      ],

      floor: [
        0,
        [Validators.required, Validators.min(0)]
      ],

      buildingId: [
        1,
        [Validators.required, Validators.min(1)]
      ],

      flatType: [
        '',
        [Validators.required]
      ],

      status: [
        'Occupied',
        [Validators.required]
      ],

      residentId: [
        null
      ]

    });
  }

  loadFlat(id: number): void {

    this.loading = true;

    this.flatService.getById(id).subscribe({

      next: (flat) => {

        this.flatForm.patchValue({
          flatNumber: flat.flatNumber,
          floor: flat.floor,
          buildingId: flat.buildingId,
          flatType: flat.flatType,
          status: flat.status,
          residentId: flat.residentId
        });

        this.loading = false;
      },

      error: (error) => {

        console.error(error);

        this.errorMessage = 'Unable to load flat.';
        this.loading = false;
      }

    });
  }

  saveFlat(): void {

    if (this.flatForm.invalid) {

      this.flatForm.markAllAsTouched();

      return;
    }

    this.loading = true;
    this.errorMessage = '';

    const flat: FlatCreate = this.flatForm.value;

    if (this.isEditMode && this.flatId !== null) {

      this.flatService
        .update(this.flatId, flat)
        .subscribe({

          next: () => {
            this.router.navigate(['/flats']);
          },

          error: (error) => {

            console.error(error);

            this.errorMessage = 'Unable to update flat.';
            this.loading = false;
          }

        });

    } else {

      this.flatService.create(flat).subscribe({

        next: () => {
          this.router.navigate(['/flats']);
        },

        error: (error) => {

          console.error(error);

          this.errorMessage = 'Unable to create flat.';
          this.loading = false;
        }

      });

    }
  }

  cancel(): void {
    this.router.navigate(['/flats']);
  }
}