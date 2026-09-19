import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

import { Parking, ParkingService } from '../Service/parking-service';

@Component({
  selector: 'app-parking-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './parking-list.html',
  styleUrl: './parking-list.css'
})
export class ParkingList implements OnInit {

  // Signals
  parkings = signal<Parking[]>([]);
  loading = signal(false);
  errorMessage = signal('');

  constructor(
    private parkingService: ParkingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadParkings();
  }

  loadParkings(): void {

    this.loading.set(true);
    this.errorMessage.set('');

    this.parkingService.getAll().subscribe({

      next: (data) => {

        this.parkings.set(data);
        this.loading.set(false);

      },

      error: (error) => {

        console.error('Error loading parking:', error);

        this.errorMessage.set(
          'Unable to load parking details.'
        );

        this.loading.set(false);

      }

    });
  }

  viewParking(id: number): void {
    this.router.navigate(['/parking', id]);
  }

  editParking(id: number): void {
    this.router.navigate(['/parking/edit', id]);
  }

  deleteParking(id: number): void {

    if (!confirm(
      'Are you sure you want to delete this parking slot?'
    )) {
      return;
    }

    this.parkingService.delete(id).subscribe({

      next: () => {
        this.loadParkings();
      },

      error: (error) => {

        console.error('Error deleting parking:', error);

        alert('Unable to delete parking slot.');

      }

    });
  }
}
