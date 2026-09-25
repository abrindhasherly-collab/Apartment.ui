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
  BuildingService,
  CreateBuilding,
  UpdateBuilding
} from '../building.service';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-building-form',
  standalone: true,

  imports: [
    ReactiveFormsModule
  ],

  templateUrl: './building-form.html',
  styleUrl: './building-form.css'
})
export class BuildingForm implements OnInit {

  buildingForm: FormGroup;

  isEdit = signal(false);

  loading = signal(false);

  errorMessage = signal('');

  buildingId = 0;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private buildingService: BuildingService,
    private toastr: ToastrService
  ) {

    this.buildingForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      totalFloors: [0, [Validators.required, Validators.min(1)]],
      totalFlats: [0, [Validators.required, Validators.min(1)]],
      isActive: [true]
    });
  }

  ngOnInit(): void {

    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    if (id) {

      this.isEdit.set(true);

      this.buildingId = id;

      this.loadBuilding(id);
    }
  }

  loadBuilding(id: number): void {

    this.loading.set(true);

    this.buildingService
      .getById(id)
      .subscribe({

        next: data => {

          this.buildingForm.patchValue({
            name: data.name,
            address: data.address,
            totalFloors: data.totalFloors,
            totalFlats: data.totalFlats,
            isActive: data.isActive
          });

          this.loading.set(false);
        },

        error: error => {

          console.error(error);

          this.errorMessage.set(
            'Unable to load building.'
          );

          this.loading.set(false);

          this.toastr.error(
            'Unable to load building.',
            'Error'
          );
        }

      });
  }

  saveBuilding(): void {

    if (this.buildingForm.invalid) {

      this.buildingForm.markAllAsTouched();

      return;
    }

    this.loading.set(true);

    this.errorMessage.set('');

    if (this.isEdit()) {

      const building: UpdateBuilding = {
        name: this.buildingForm.value.name,
        address: this.buildingForm.value.address,
        totalFloors: this.buildingForm.value.totalFloors,
        totalFlats: this.buildingForm.value.totalFlats,
        isActive: this.buildingForm.value.isActive
      };

      this.buildingService
        .update(this.buildingId, building)
        .subscribe({

          next: () => {

            this.loading.set(false);

            this.toastr.success(
              'Building updated successfully.',
              'Success'
            );

            this.router.navigate(['/buildings']);
          },

          error: error => {

            console.error(error);

            this.errorMessage.set(
              'Unable to update building.'
            );

            this.loading.set(false);

            this.toastr.error(
              'Unable to update building.',
              'Error'
            );
          }

        });

    } else {

      const building: CreateBuilding = {
        name: this.buildingForm.value.name,
        address: this.buildingForm.value.address,
        totalFloors: this.buildingForm.value.totalFloors,
        totalFlats: this.buildingForm.value.totalFlats
      };

      this.buildingService
        .create(building)
        .subscribe({

          next: () => {

            this.loading.set(false);

            this.toastr.success(
              'Building created successfully.',
              'Success'
            );

            this.router.navigate(['/buildings']);
          },

          error: error => {

            console.error(error);

            this.errorMessage.set(
              'Unable to create building.'
            );

            this.loading.set(false);

            this.toastr.error(
              'Unable to create building.',
              'Error'
            );
          }

        });
    }
  }

  cancel(): void {

    this.router.navigate(['/buildings']);
  }
}