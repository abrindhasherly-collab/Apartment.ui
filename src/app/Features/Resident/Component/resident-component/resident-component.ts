import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  Resident,
  CreateResident,
  UpdateResident
} from '../../Model/resident-model';

import { ResidentService } from '../../Service/resident-service';

@Component({
  selector: 'app-residents',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './resident-component.html',
  styleUrl: './resident-component.css'
})
export class ResidentComponent implements OnInit {

  // ========================================
  // Residents
  // ========================================

  residents = signal<Resident[]>([]);

  filteredResidents = computed(() => {

    const residents = this.residents();

    const search = this.searchText()
      .toLowerCase()
      .trim();

    const selectedFlat = this.selectedFlat();

    return residents.filter(resident => {

      const matchesSearch =
        resident.name
          .toLowerCase()
          .includes(search) ||

        resident.phone
          .includes(search) ||

        resident.email
          .toLowerCase()
          .includes(search) ||

        resident.flatId
          .toString()
          .includes(search);


      const matchesFlat =
        selectedFlat === 'All Flats' ||
        resident.flatId.toString() === selectedFlat;


      return matchesSearch && matchesFlat;

    });

  });


  // ========================================
  // Search / Filter
  // ========================================

  searchText = signal('');

  selectedFlat = signal('All Flats');


  // ========================================
  // Loading / Error
  // ========================================

  loading = signal(false);

  errorMessage = signal('');


  // ========================================
  // Resident Form
  // ========================================

  showForm = signal(false);

  editMode = signal(false);

  selectedResidentId = signal<number | null>(null);


  residentForm: CreateResident = {

    userId: 0,

    flatId: 0,

    name: '',

    phone: '',

    email: ''

  };


  // ========================================
  // Selected Resident
  // ========================================

  selectedResident =
    signal<Resident | null>(null);


  // ========================================
  // Toast
  // ========================================

  toastMessage = signal('');

  toastType =
    signal<'success' | 'error'>('success');

  showToast = signal(false);


  // ========================================
  // Constructor
  // ========================================

  constructor(
    private residentService: ResidentService
  ) {}


  // ========================================
  // On Init
  // ========================================

  ngOnInit(): void {

    this.loadResidents();

  }


  // ========================================
  // Load Residents
  // ========================================

  loadResidents(): void {

    this.loading.set(true);

    this.errorMessage.set('');

    this.residentService
      .getAll()
      .subscribe({

        next: (data) => {

          this.residents.set(data);

          this.loading.set(false);

        },

        error: (error) => {

          console.error(error);

          this.errorMessage.set(
            'Unable to load residents.'
          );

          this.loading.set(false);

          this.showToastMessage(
            'Unable to load residents.',
            'error'
          );

        }

      });

  }


  // ========================================
  // Active Residents Count
  // ResidentStatus.Active = 1
  // ========================================

  activeResidentsCount(): number {

    return this.residents()
      .filter(resident => resident.status === 1)
      .length;

  }


  // ========================================
  // Inactive Residents Count
  // ResidentStatus.Inactive = 2
  // ========================================

  inactiveResidentsCount(): number {

    return this.residents()
      .filter(resident => resident.status === 2)
      .length;

  }


  // ========================================
  // Open Add Form
  // ========================================

  openAddForm(): void {

    this.editMode.set(false);

    this.showForm.set(true);

    this.selectedResidentId.set(null);

    this.residentForm = {

      userId: 0,

      flatId: 0,

      name: '',

      phone: '',

      email: ''

    };

  }


  // ========================================
  // Open Edit Form
  // ========================================

  openEditForm(resident: Resident): void {

    this.editMode.set(true);

    this.showForm.set(true);

    this.selectedResidentId.set(
      resident.id
    );

    this.residentForm = {

      userId: resident.userId,

      flatId: resident.flatId,

      name: resident.name,

      phone: resident.phone,

      email: resident.email

    };

  }


  // ========================================
  // Save Resident
  // ========================================

  saveResident(): void {

    // ----------------------------------------
    // Validation
    // ----------------------------------------

    if (

      !this.residentForm.name.trim() ||

      !this.residentForm.phone.trim() ||

      !this.residentForm.email.trim()

    ) {

      this.showToastMessage(
        'Please fill all required fields.',
        'error'
      );

      return;

    }


    // ----------------------------------------
    // UPDATE
    // ----------------------------------------

    if (

      this.editMode() &&

      this.selectedResidentId() !== null

    ) {

      const resident =
        this.residents().find(
          x =>
            x.id ===
            this.selectedResidentId()
        );


      if (!resident) {

        this.showToastMessage(
          'Resident not found.',
          'error'
        );

        return;

      }


      const updateData: UpdateResident = {

        userId:
          this.residentForm.userId,

        flatId:
          this.residentForm.flatId,

        name:
          this.residentForm.name,

        phone:
          this.residentForm.phone,

        email:
          this.residentForm.email,

        dateOfJoining:
          resident.dateOfJoining,

        status:
          resident.status

      };


      this.residentService
        .update(
          this.selectedResidentId()!,
          updateData
        )
        .subscribe({

          next: () => {

            this.closeForm();

            this.showToastMessage(
              'Resident updated successfully.',
              'success'
            );

            this.loadResidents();

          },

          error: (error) => {

            console.error(error);

            this.showToastMessage(
              'Unable to update resident.',
              'error'
            );

          }

        });

    }


    // ----------------------------------------
    // CREATE
    // ----------------------------------------

    else {

      this.residentService
        .create(this.residentForm)
        .subscribe({

          next: () => {

            this.closeForm();

            this.showToastMessage(
              'Resident created successfully.',
              'success'
            );

            this.loadResidents();

          },

          error: (error) => {

            console.error(error);

            this.showToastMessage(
              'Unable to create resident.',
              'error'
            );

          }

        });

    }

  }


  // ========================================
  // Delete Resident
  // ========================================

  deleteResident(id: number): void {

    const confirmed =
      confirm(
        'Are you sure you want to delete this resident?'
      );


    if (!confirmed) {

      return;

    }


    this.residentService
      .delete(id)
      .subscribe({

        next: () => {

          this.showToastMessage(
            'Resident deleted successfully.',
            'success'
          );

          this.loadResidents();

        },

        error: (error) => {

          console.error(error);

          this.showToastMessage(
            'Unable to delete resident.',
            'error'
          );

        }

      });

  }


  // ========================================
  // View Resident
  // ========================================

  viewResident(
    resident: Resident
  ): void {

    console.log(
      'Resident details:',
      resident
    );

    this.selectedResident.set(
      resident
    );

  }


  // ========================================
  // Close View
  // ========================================

  closeView(): void {

    this.selectedResident.set(null);

  }


  // ========================================
  // Close Form
  // ========================================

  closeForm(): void {

    this.showForm.set(false);

    this.editMode.set(false);

    this.selectedResidentId.set(null);

  }


  // ========================================
  // Status Text
  // ========================================

  getStatus(status: number): string {

    switch (status) {

      case 1:

        return 'Active';


      case 2:

        return 'Inactive';


      default:

        return 'Unknown';

    }

  }


  // ========================================
  // Toast
  // ========================================

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