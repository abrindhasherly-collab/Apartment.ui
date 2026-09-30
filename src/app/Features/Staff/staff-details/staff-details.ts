import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  ActivatedRoute,
  Router,
  RouterLink
} from '@angular/router';

import {
  Staff,
  StaffService
} from '../Service/staff-service';


@Component({
  selector: 'app-staff-details',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './staff-details.html',
  styleUrl: './staff-details.css'
})
export class StaffDetails implements OnInit {

  // =========================
  // Staff
  // =========================

  staff?: Staff;

  loading = false;


  // =========================
  // Toast Signals
  // =========================

  toastMessage = signal('');

  toastType = signal<'success' | 'error'>('success');

  showToast = signal(false);


  constructor(
    private staffService: StaffService,
    private route: ActivatedRoute,
    private router: Router
  ) {}


  // =========================
  // On Init
  // =========================

  ngOnInit(): void {

    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.loadStaff(id);

  }


  // =========================
  // Load Staff
  // =========================

  loadStaff(id: number): void {

    this.loading = true;

    this.staffService
      .getById(id)
      .subscribe({

        next: (data) => {

          this.staff = data;

          this.loading = false;

        },

        error: (error) => {

          console.error(
            'Error loading staff:',
            error
          );

          this.loading = false;


          this.showToastMessage(
            'Staff details not found.',
            'error'
          );


          setTimeout(() => {

            this.router.navigate([
              '/staff'
            ]);

          }, 2000);

        }

      });

  }


  // =========================
  // Edit Staff
  // =========================

  editStaff(): void {

    if (this.staff) {

      this.router.navigate([
        '/staff/edit',
        this.staff.id
      ]);

    }

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