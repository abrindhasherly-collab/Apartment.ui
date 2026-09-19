import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ActivatedRoute,
  Router
} from '@angular/router';

// import { Maintenance } from '../../models/maintenance.model';
import { Maintenance, MaintenanceService } from '../Service/maintenance-service';

@Component({
  selector: 'app-maintenance-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './maintenance-details.html',
  styleUrl: './maintenance-details.css'
})
export class MaintenanceDetails implements OnInit {

  maintenance: Maintenance | null = null;

  loading = false;
  errorMessage = '';

  constructor(
    private maintenanceService: MaintenanceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {

    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    if (id) {
      this.loadMaintenance(id);
    }

  }

  loadMaintenance(id: number): void {

    this.loading = true;

    this.maintenanceService
      .getById(id)
      .subscribe({

        next: (data) => {

          this.maintenance = data;
          this.loading = false;

        },

        error: (error) => {

          console.error(error);

          this.errorMessage =
            'Unable to load maintenance record.';

          this.loading = false;

        }

      });

  }

  editMaintenance(): void {

    if (this.maintenance) {

      this.router.navigate([
        '/maintenance/edit',
        this.maintenance.id
      ]);

    }

  }

  goBack(): void {

    this.router.navigate([
      '/maintenance'
    ]);

  }
}