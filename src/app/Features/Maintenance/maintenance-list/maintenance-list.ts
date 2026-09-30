import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

import {
  Maintenance,
  MaintenanceService
} from '../Service/maintenance-service';

@Component({
  selector: 'app-maintenance-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './maintenance-list.html',
  styleUrl: './maintenance-list.css'
})
export class MaintenanceList implements OnInit {

  // Signals
  maintenances = signal<Maintenance[]>([]);
  loading = signal(false);
  errorMessage = signal('');

  // Toast Signals
  toastMessage = signal('');
  toastType = signal<'success' | 'error'>('success');
  showToast = signal(false);

  constructor(
    private maintenanceService: MaintenanceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadMaintenances();
  }

  loadMaintenances(): void {

    this.loading.set(true);
    this.errorMessage.set('');

    this.maintenanceService.getAll().subscribe({

      next: (data) => {

        this.maintenances.set(data);
        this.loading.set(false);

      },

      error: (error) => {

        console.error(error);

        this.errorMessage.set(
          'Unable to load maintenance records.'
        );

        this.loading.set(false);

        this.showToastMessage(
          'Unable to load maintenance records.',
          'error'
        );

      }

    });
  }

  viewMaintenance(id: number): void {

    this.router.navigate([
      '/maintenance',
      id
    ]);

  }

  editMaintenance(id: number): void {

    this.router.navigate([
      '/maintenance/edit',
      id
    ]);

  }

  deleteMaintenance(id: number): void {

    const confirmed = confirm(
      'Are you sure you want to delete this maintenance record?'
    );

    if (!confirmed) {
      return;
    }

    this.maintenanceService.delete(id).subscribe({

      next: () => {

        this.showToastMessage(
          'Maintenance record deleted successfully.',
          'success'
        );

        this.loadMaintenances();

      },

      error: (error) => {

        console.error(error);

        this.showToastMessage(
          'Unable to delete maintenance record.',
          'error'
        );

      }

    });
  }

  // Toast
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