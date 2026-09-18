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
    private buildingService: BuildingService,
    private route: ActivatedRoute,
    private router: Router
  ) {

    this.buildingForm = this.fb.group({

      name: [
        '',
        Validators.required
      ],

      address: [
        '',
        Validators.required
      ],

      totalFloors: [
        1,
        [
          Validators.required,
          Validators.min(1)
        ]
      ],

      totalFlats: [
        1,
        [
          Validators.required,
          Validators.min(1)
        ]
      ],

      isActive: [
        true
      ]

    });
  }

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {

      this.buildingId = Number(id);

      this.isEdit.set(true);

      this.loadBuilding(this.buildingId);
    }
  }

  loadBuilding(id: number): void {

    this.loading.set(true);

    this.buildingService
      .getById(id)
      .subscribe({

        next: building => {

          this.buildingForm.patchValue(building);

          this.loading.set(false);
        },

        error: error => {

          console.error(error);

          this.errorMessage.set(
            'Unable to load building.'
          );

          this.loading.set(false);
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

      const updateData: UpdateBuilding = {

        name: this.buildingForm.value.name,

        address: this.buildingForm.value.address,

        totalFloors: this.buildingForm.value.totalFloors,

        totalFlats: this.buildingForm.value.totalFlats,

        isActive: this.buildingForm.value.isActive

      };

      this.buildingService
        .update(
          this.buildingId,
          updateData
        )
        .subscribe({

          next: () => {

            this.router.navigate([
              '/buildings'
            ]);

          },

          error: error => {

            console.error(error);

            this.errorMessage.set(
              'Unable to update building.'
            );

            this.loading.set(false);
          }

        });

    } else {

      const createData: CreateBuilding = {

        name: this.buildingForm.value.name,

        address: this.buildingForm.value.address,

        totalFloors: this.buildingForm.value.totalFloors,

        totalFlats: this.buildingForm.value.totalFlats

      };

      this.buildingService
        .create(createData)
        .subscribe({

          next: () => {

            this.router.navigate([
              '/buildings'
            ]);

          },

          error: error => {

            console.error(error);

            this.errorMessage.set(
              'Unable to create building.'
            );

            this.loading.set(false);
          }

        });
    }
  }

  cancel(): void {

    this.router.navigate([
      '/buildings'
    ]);
  }
}