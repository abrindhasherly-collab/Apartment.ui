import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { Parking, ParkingService } from '../Service/parking-service';
// import { Parking } from '../../models/parking.model';

@Component({
  selector: 'app-parking-details',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './parking-details.html',
  styleUrl: './parking-details.css'
})
export class ParkingDetails implements OnInit {

  parking?: Parking;
  loading = false;

  constructor(
    private parkingService: ParkingService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {

    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.loadParking(id);
  }


  loadParking(id: number): void {

    this.loading = true;

    this.parkingService.getById(id).subscribe({

      next: (data) => {

        this.parking = data;

        this.loading = false;

      },

      error: (error) => {

        console.error('Error loading parking:', error);

        this.loading = false;

        alert('Parking details not found.');

        this.router.navigate(['/parking']);

      }

    });

  }


  editParking(): void {

    if (this.parking) {

      this.router.navigate([
        '/parking/edit',
        this.parking.id
      ]);

    }

  }

}