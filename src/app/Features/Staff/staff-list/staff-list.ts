import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

import { Staff, StaffService } from '../Service/staff-service';

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

  // Signals
  staffs = signal<Staff[]>([]);
  loading = signal(false);
  errorMessage = signal('');

  constructor(
    private staffService: StaffService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadStaff();
  }

  loadStaff(): void {

    this.loading.set(true);
    this.errorMessage.set('');

    this.staffService.getAll().subscribe({

      next: (data) => {

        this.staffs.set(data);
        this.loading.set(false);

      },

      error: (error) => {

        console.error('Error loading staff:', error);

        this.errorMessage.set(
          'Unable to load staff details.'
        );

        this.loading.set(false);

      }

    });
  }

  viewStaff(id: number): void {

    this.router.navigate([
      '/staff',
      id
    ]);

  }

  editStaff(id: number): void {

    this.router.navigate([
      '/staff/edit',
      id
    ]);

  }

  deleteStaff(id: number): void {

    if (!confirm(
      'Are you sure you want to delete this staff member?'
    )) {
      return;
    }

    this.staffService.delete(id).subscribe({

      next: () => {

        this.loadStaff();

      },

      error: (error) => {

        console.error('Error deleting staff:', error);

        alert('Unable to delete staff member.');

      }

    });
  }
}
