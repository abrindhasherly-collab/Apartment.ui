import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

import {
  Staff,
  StaffService
} from '../Service/staff-service';


@Component({
  selector: 'app-staff-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './staff-list.html',
  styleUrl: './staff-list.css'
})
export class StaffList implements OnInit {

  // =========================
  // Signals
  // =========================

  staffs = signal<Staff[]>([]);

  loading = signal(false);

  errorMessage = signal('');


  // =========================
  // Toast Signals
  // =========================

  toastMessage = signal('');

  toastType = signal<'success' | 'error'>('success');

  showToast = signal(false);


  constructor(
    private staffService: StaffService,
    private router: Router
  ) {}


  // =========================
  // On Init
  // =========================

  ngOnInit(): void {

    this.loadStaff();

  }


  // =========================
  // Load Staff
  // =========================

  loadStaff(): void {

    this.loading.set(true);

    this.errorMessage.set('');


    this.staffService
      .getAll()
      .subscribe({

        next: (data) => {

          this.staffs.set(data);

          this.loading.set(false);

        },

        error: (error) => {

          console.error(
            'Error loading staff:',
            error
          );

          this.errorMessage.set(
            'Unable to load staff details.'
          );

          this.loading.set(false);


          this.showToastMessage(
            'Unable to load staff details.',
            'error'
          );

        }

      });

  }


  // =========================
  // View Staff
  // =========================

  viewStaff(id: number): void {

    this.router.navigate([
      '/staff',
      id
    ]);

  }


  // =========================
  // Edit Staff
  // =========================

  editStaff(id: number): void {

    this.router.navigate([
      '/staff/edit',
      id
    ]);

  }


  // =========================
  // Delete Staff
  // =========================

  deleteStaff(id: number): void {

    if (
      !confirm(
        'Are you sure you want to delete this staff member?'
      )
    ) {

      return;

    }


    this.staffService
      .delete(id)
      .subscribe({

        next: () => {

          this.showToastMessage(
            'Staff deleted successfully.',
            'success'
          );

          this.loadStaff();

        },

        error: (error) => {

          console.error(
            'Error deleting staff:',
            error
          );


          this.showToastMessage(
            'Unable to delete staff member.',
            'error'
          );

        }

      });

  }


  // =========================
  // Toast
  // =========================

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