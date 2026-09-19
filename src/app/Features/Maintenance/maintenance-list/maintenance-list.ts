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

        this.loadMaintenances();

      },

      error: (error) => {

        console.error(error);

        alert(
          'Unable to delete maintenance record.'
        );

      }

    });
  }
}
