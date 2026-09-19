import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

// import { Flat } from '../../models/flat.model';
import { Flat, FlatService } from '../Service/flat-service';

@Component({
  selector: 'app-flat-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './flat-details.html',
  styleUrl: './flat-details.css'
})
export class FlatDetails implements OnInit {

  flat: Flat | null = null;

  loading = false;
  errorMessage = '';

  constructor(
    private flatService: FlatService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {

    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    if (id) {
      this.loadFlat(id);
    }
  }

  loadFlat(id: number): void {

    this.loading = true;

    this.flatService.getById(id).subscribe({

      next: (data) => {

        this.flat = data;
        this.loading = false;

      },

      error: (error) => {

        console.error(error);

        this.errorMessage = 'Unable to load flat.';
        this.loading = false;

      }

    });
  }

  editFlat(): void {

    if (this.flat) {
      this.router.navigate([
        '/flats/edit',
        this.flat.id
      ]);
    }

  }

  goBack(): void {
    this.router.navigate(['/flats']);
  }
}