
import {
  Component,
  OnInit,
  signal
} from '@angular/core';

import {
  RouterLink
} from '@angular/router';

import {
  BuildingService,
  Building
} from '../building.service';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-building-list',
  standalone: true,

  imports: [
    RouterLink
  ],

  templateUrl: './building-list.html',
  styleUrl: './building-list.css'
})
export class BuildingList implements OnInit {

  buildings = signal<Building[]>([]);

  loading = signal(false);

  constructor(
    private buildingService: BuildingService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {

    this.loadBuildings();
  }

  loadBuildings(): void {

    this.loading.set(true);

    this.buildingService
      .getAll()
      .subscribe({

        next: data => {

          this.buildings.set(data);

          this.loading.set(false);
        },

        error: error => {

          console.error(error);

          this.loading.set(false);

          this.toastr.error(
            'Unable to load buildings.',
            'Error'
          );
        }

      });
  }

  deleteBuilding(id: number): void {

    if (!confirm('Delete this building?')) {
      return;
    }

    this.buildingService
      .delete(id)
      .subscribe({

        next: () => {

          this.toastr.success(
            'Building deleted successfully.',
            'Success'
          );

          this.loadBuildings();
        },

        error: error => {

          console.error(error);

          this.toastr.error(
            'Delete failed.',
            'Error'
          );
        }

      });
  }
}

