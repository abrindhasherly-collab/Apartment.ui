import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

import { Flat, FlatService } from '../Service/flat-service';

@Component({
  selector: 'app-flat-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './flat-list.html',
  styleUrl: './flat-list.css'
})
export class FlatList implements OnInit {

  // Signals
  flats = signal<Flat[]>([]);
  loading = signal(false);
  errorMessage = signal('');

  constructor(
    private flatService: FlatService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadFlats();
  }

  loadFlats(): void {

    this.loading.set(true);
    this.errorMessage.set('');

    this.flatService.getAll().subscribe({

      next: (data) => {

        this.flats.set(data);
        this.loading.set(false);

      },

      error: (error) => {

        console.error(error);

        this.errorMessage.set('Unable to load flats.');
        this.loading.set(false);

      }

    });
  }

  viewFlat(id: number): void {
    this.router.navigate(['/flats', id]);
  }

  editFlat(id: number): void {
    this.router.navigate(['/flats/edit', id]);
  }

  deleteFlat(id: number): void {

    const confirmed = confirm(
      'Are you sure you want to delete this flat?'
    );

    if (!confirmed) {
      return;
    }

    this.flatService.delete(id).subscribe({

      next: () => {
        this.loadFlats();
      },

      error: (error) => {

        console.error(error);

        alert('Unable to delete flat.');

      }

    });
  }
}

