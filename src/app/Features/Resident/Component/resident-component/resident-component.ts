import { Component, OnInit, signal, computed } from '@angular/core';
//                                  🔴 ADDED: signal, computed

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

  // 🔴 SIGNAL ADDED
  residents = signal<Resident[]>([]);

  // 🔴 SIGNAL ADDED
  searchText = signal('');

  // 🔴 SIGNAL ADDED
  selectedFlat = signal('All Flats');

  // 🔴 SIGNAL ADDED
  loading = signal(false);

  // 🔴 SIGNAL ADDED
  errorMessage = signal('');

  // 🔴 SIGNAL ADDED
  showForm = signal(false);

  // 🔴 SIGNAL ADDED
  editMode = signal(false);

  // 🔴 SIGNAL ADDED
  selectedResidentId = signal<number | null>(null);


  residentForm: CreateResident = {
    userId: 0,
    flatId: 0,
    name: '',
    phone: '',
    email: ''
  };


  constructor(
    private residentService: ResidentService
  ) {}


  ngOnInit(): void {
    this.loadResidents();
  }


  loadResidents(): void {

    // 🔴 SIGNAL SET
    this.loading.set(true);

    this.residentService.getAll().subscribe({

      next: (data) => {

        // 🔴 SIGNAL SET
        this.residents.set(data);

        // 🔴 SIGNAL SET
        this.loading.set(false);
      },

      error: (error) => {

        console.error(error);

        // 🔴 SIGNAL SET
        this.errorMessage.set('Unable to load residents.');

        // 🔴 SIGNAL SET
        this.loading.set(false);
      }
    });
  }


  // 🔴 SIGNAL + COMPUTED ADDED
  filteredResidents = computed(() => {

    const residents = this.residents();

    const search = this.searchText()
      .toLowerCase()
      .trim();

    const selectedFlat = this.selectedFlat();

    return residents.filter(resident => {

      const matchesSearch =
        resident.name.toLowerCase().includes(search) ||
        resident.phone.includes(search) ||
        resident.email.toLowerCase().includes(search) ||
        resident.flatId.toString().includes(search);

      const matchesFlat =
        selectedFlat === 'All Flats' ||
        resident.flatId.toString() === selectedFlat;

      return matchesSearch && matchesFlat;
    });
  });


  openAddForm(): void {

    // 🔴 SIGNAL SET
    this.editMode.set(false);

    // 🔴 SIGNAL SET
    this.showForm.set(true);

    // 🔴 SIGNAL SET
    this.selectedResidentId.set(null);

    this.residentForm = {
      userId: 0,
      flatId: 0,
      name: '',
      phone: '',
      email: ''
    };
  }


  openEditForm(resident: Resident): void {

    // 🔴 SIGNAL SET
    this.editMode.set(true);

    // 🔴 SIGNAL SET
    this.showForm.set(true);

    // 🔴 SIGNAL SET
    this.selectedResidentId.set(resident.id);

    this.residentForm = {
      userId: resident.userId,
      flatId: resident.flatId,
      name: resident.name,
      phone: resident.phone,
      email: resident.email
    };
  }


  saveResident(): void {

    if (
      !this.residentForm.name ||
      !this.residentForm.phone ||
      !this.residentForm.email
    ) {
      return;
    }


    // 🔴 SIGNAL READ
    if (
      this.editMode() &&
      this.selectedResidentId() !== null
    ) {

      // 🔴 SIGNAL READ
      const resident = this.residents().find(
        x => x.id === this.selectedResidentId()
      );

      if (!resident) {
        return;
      }


      const updateData: UpdateResident = {
        ...this.residentForm,
        dateOfJoining: resident.dateOfJoining,
        status: resident.status
      };


      this.residentService
        // 🔴 SIGNAL READ
        .update(this.selectedResidentId()!, updateData)
        .subscribe({

          next: () => {
            this.closeForm();
            this.loadResidents();
          },

          error: error => {
            console.error(error);
          }
        });

    } else {

      this.residentService
        .create(this.residentForm)
        .subscribe({

          next: () => {
            this.closeForm();
            this.loadResidents();
          },

          error: error => {
            console.error(error);
          }
        });
    }
  }


  deleteResident(id: number): void {

    if (!confirm('Are you sure you want to delete this resident?')) {
      return;
    }

    this.residentService.delete(id).subscribe({

      next: () => {
        this.loadResidents();
      },

      error: error => {
        console.error(error);
      }
    });
  }

  selectedResident = signal<Resident | null>(null);
  
  viewResident(resident: Resident): void {
  console.log('Resident details:', resident);

  this.selectedResident.set(resident);
}

closeView(): void {
  this.selectedResident.set(null);
}


  closeForm(): void {

    // 🔴 SIGNAL SET
    this.showForm.set(false);
  }


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
}