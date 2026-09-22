
import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  CreateEmergency,
  Emergency,
  UpdateEmergency
} from '../../Model/emergency-model';

import { EmergencyService } from '../../Service/emergency-service';


@Component({
  selector: 'app-emergency',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './emergency-component.html',
  styleUrl: './emergency-component.css'
})
export class EmergencyComponent implements OnInit {

  // ==============================
  // Signals
  // ==============================

  emergencies = signal<Emergency[]>([]);

  searchText = signal('');
  priorityFilter = signal('All Priority');

  loading = signal(false);
  errorMessage = signal('');

  showForm = signal(false);
  editMode = signal(false);

  selectedEmergencyId = signal<number | null>(null);


  emergencyForm = signal<CreateEmergency>({
    residentId: 0,
    flatId: 0,
    emergencyType: '',
    description: '',
    priority: 1
  });


  // ==============================
  // Computed Signal
  // ==============================

  filteredEmergencies = computed(() => {

    const emergencies = this.emergencies();

    const search = this.searchText()
      .toLowerCase()
      .trim();

    const priorityFilter = this.priorityFilter();

    return emergencies.filter(emergency => {

      const matchesSearch =
        emergency.emergencyType
          .toLowerCase()
          .includes(search) ||

        emergency.description
          .toLowerCase()
          .includes(search) ||

        emergency.residentId
          .toString()
          .includes(search) ||

        emergency.flatId
          .toString()
          .includes(search);


      const matchesPriority =
        priorityFilter === 'All Priority' ||
        this.getPriority(emergency.priority) === priorityFilter;


      return matchesSearch && matchesPriority;
    });
  });


  constructor(
    private emergencyService: EmergencyService
  ) {}


  // ==============================
  // Initial Load
  // ==============================

  ngOnInit(): void {
    this.loadEmergencies();
  }


  // ==============================
  // Load Emergencies
  // ==============================

  loadEmergencies(): void {

    this.loading.set(true);

    this.emergencyService.getAll().subscribe({

      next: data => {

        this.emergencies.set(data);

        this.loading.set(false);
      },

      error: error => {

        console.error(error);

        this.errorMessage.set(
          'Unable to load emergency records.'
        );

        this.loading.set(false);
      }

    });
  }


  // ==============================
  // Open Add Form
  // ==============================

  openAddForm(): void {

    this.editMode.set(false);

    this.showForm.set(true);

    this.selectedEmergencyId.set(null);

    this.emergencyForm.set({
      residentId: 0,
      flatId: 0,
      emergencyType: '',
      description: '',
      priority: 1
    });
  }


  // ==============================
  // Open Edit Form
  // ==============================

  openEditForm(emergency: Emergency): void {

    this.editMode.set(true);

    this.showForm.set(true);

    this.selectedEmergencyId.set(emergency.id);

    this.emergencyForm.set({
      residentId: emergency.residentId,
      flatId: emergency.flatId,
      emergencyType: emergency.emergencyType,
      description: emergency.description,
      priority: emergency.priority
    });
  }


  // ==============================
  // Save Emergency
  // ==============================

  saveEmergency(): void {

    const form = this.emergencyForm();

    if (
      form.residentId <= 0 ||
      form.flatId <= 0 ||
      !form.emergencyType ||
      !form.description
    ) {
      return;
    }


    // ==========================
    // UPDATE
    // ==========================

    if (
      this.editMode() &&
      this.selectedEmergencyId() !== null
    ) {

      const id = this.selectedEmergencyId();

      const existing = this.emergencies().find(
        x => x.id === id
      );

      if (!existing) {
        return;
      }


      const updateData: UpdateEmergency = {
        ...form,
        status: existing.status
      };


      this.emergencyService
        .update(id!, updateData)
        .subscribe({

          next: () => {

            this.closeForm();

            this.loadEmergencies();
          },

          error: error => {

            console.error(error);
          }

        });

    }

    // ==========================
    // CREATE
    // ==========================

    else {

      this.emergencyService
        .create(form)
        .subscribe({

          next: () => {

            this.closeForm();

            this.loadEmergencies();
          },

          error: error => {

            console.error(error);
          }

        });
    }
  }


  // ==============================
  // Delete Emergency
  // ==============================

  deleteEmergency(id: number): void {

    if (
      !confirm(
        'Are you sure you want to delete this emergency?'
      )
    ) {
      return;
    }


    this.emergencyService
      .delete(id)
      .subscribe({

        next: () => {

          this.loadEmergencies();
        },

        error: error => {

          console.error(error);
        }

      });
  }


  // ==============================
  // Close Form
  // ==============================

  closeForm(): void {

    this.showForm.set(false);
  }


  // ==============================
  // Priority
  // ==============================

  getPriority(priority: number): string {

    switch (priority) {

      case 1:
        return 'Low';

      case 2:
        return 'Medium';

      case 3:
        return 'High';

      case 4:
        return 'Critical';

      default:
        return 'Unknown';
    }
  }


  // ==============================
  // Status
  // ==============================

  getStatus(status: number): string {

    switch (status) {

      case 1:
        return 'Reported';

      case 2:
        return 'In Progress';

      case 3:
        return 'Resolved';

      default:
        return 'Unknown';
    }
  }
}
