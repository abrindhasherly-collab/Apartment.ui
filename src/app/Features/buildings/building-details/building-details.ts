import {
  Component,
  OnInit,
  signal
} from '@angular/core';

import {
  ActivatedRoute,
  Router,
  RouterLink
} from '@angular/router';

// import {
//   Building
// } from '../building.model';

import {
  BuildingService
} from '../building.service';

@Component({
  selector: 'app-building-details',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './building-details.html',
  styleUrl: './building-details.css'
})
export class BuildingDetails implements OnInit {

  building = signal<any>(null);

  loading = signal(false);

  errorMessage = signal('');

  constructor(
    private route: ActivatedRoute,
    private buildingService: BuildingService,
    private router: Router
  ) {}

  ngOnInit(): void {

    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.loadBuilding(id);
  }

  loadBuilding(id: number): void {

    this.loading.set(true);

    this.buildingService
      .getById(id)
      .subscribe({

        next: data => {

          this.building.set(data);

          this.loading.set(false);
        },

        error: error => {

          console.error(error);

          this.errorMessage.set(
            'Building not found.'
          );

          this.loading.set(false);
        }

      });
  }

  deleteBuilding(): void {

    const data = this.building();

    if (!data) {
      return;
    }

    if (!confirm('Are you sure you want to delete this building?')) {
      return;
    }

    this.buildingService
      .delete(data.id)
      .subscribe({

        next: () => {

          this.router.navigate(['/buildings']);
        },

        error: error => {

          console.error(error);

          this.errorMessage.set(
            'Unable to delete building.'
          );
        }

      });
  }
}