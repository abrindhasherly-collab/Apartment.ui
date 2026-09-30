import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private apiUrl = 'https://localhost:7202/api';

  residentsCount = signal(0);
  flatsCount = signal(0);
  maintenanceCount = signal(0);
  paymentsCount = signal(0);
  complaintsCount = signal(0);
  emergencyCount = signal(0);
  parkingCount = signal(0);
  staffCount = signal(0);
  noticesCount = signal(0);
  documentsCount = signal(0);
  usersCount = signal(0);

  loading = signal(false);
  errorMessage = signal('');

  constructor(private http: HttpClient) {}

  loadDashboard(): void {

    this.loading.set(true);
    this.errorMessage.set('');

    forkJoin({
      residents: this.http.get<any[]>(`${this.apiUrl}/Resident`),
      flats: this.http.get<any[]>(`${this.apiUrl}/Flats`),
      maintenance: this.http.get<any[]>(`${this.apiUrl}/Maintenance`),
      payments: this.http.get<any[]>(`${this.apiUrl}/Payment`),
      complaints: this.http.get<any[]>(`${this.apiUrl}/Complaint`),
      emergency: this.http.get<any[]>(`${this.apiUrl}/Emergency`),
      parking: this.http.get<any[]>(`${this.apiUrl}/Parking`),
      staff: this.http.get<any[]>(`${this.apiUrl}/Staff`),
      notices: this.http.get<any[]>(`${this.apiUrl}/Notices`),
      documents: this.http.get<any[]>(`${this.apiUrl}/Documents`),
      users: this.http.get<any[]>(`${this.apiUrl}/Users`)
    }).subscribe({
      next: (data) => {

        this.residentsCount.set(data.residents.length);
        this.flatsCount.set(data.flats.length);
        this.maintenanceCount.set(data.maintenance.length);
        this.paymentsCount.set(data.payments.length);
        this.complaintsCount.set(data.complaints.length);
        this.emergencyCount.set(data.emergency.length);
        this.parkingCount.set(data.parking.length);
        this.staffCount.set(data.staff.length);
        this.noticesCount.set(data.notices.length);
        this.documentsCount.set(data.documents.length);
        this.usersCount.set(data.users.length);

        this.loading.set(false);
      },

      error: (error) => {

        console.error('Dashboard loading error:', error);

        this.errorMessage.set(
          'Unable to load dashboard data.'
        );

        this.loading.set(false);
      }
    });
  }
}