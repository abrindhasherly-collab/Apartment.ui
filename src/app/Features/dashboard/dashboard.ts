import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DashboardService } from '../dashboard/dashboard-service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent implements OnInit {

  private dashboardService = inject(DashboardService);

  residentsCount = this.dashboardService.residentsCount;
  flatsCount = this.dashboardService.flatsCount;
  maintenanceCount = this.dashboardService.maintenanceCount;
  paymentsCount = this.dashboardService.paymentsCount;
  complaintsCount = this.dashboardService.complaintsCount;
  emergencyCount = this.dashboardService.emergencyCount;
  parkingCount = this.dashboardService.parkingCount;
  staffCount = this.dashboardService.staffCount;
  noticesCount = this.dashboardService.noticesCount;
  documentsCount = this.dashboardService.documentsCount;
  usersCount = this.dashboardService.usersCount;

  loading = this.dashboardService.loading;
  errorMessage = this.dashboardService.errorMessage;

  ngOnInit(): void {
    this.dashboardService.loadDashboard();
  }

  refresh(): void {
    this.dashboardService.loadDashboard();
  }
}