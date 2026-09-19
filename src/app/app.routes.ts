import { Routes } from '@angular/router';

export const routes: Routes = [

  // Default
  {
    path: '',
    redirectTo: 'flats',
    pathMatch: 'full'
  },

  // =========================
  // FLATS
  // =========================

  {
    path: 'flats/add',
    loadComponent: () =>
      import('./Features/Flats/flat-form/flat-form')
        .then(m => m.FlatForm)
  },

  {
    path: 'flats/edit/:id',
    loadComponent: () =>
      import('./Features/Flats/flat-form/flat-form')
        .then(m => m.FlatForm)
  },

  {
    path: 'flats/:id',
    loadComponent: () =>
      import('./Features/Flats/flat-details/flat-details')
        .then(m => m.FlatDetails)
  },

  {
    path: 'flats',
    loadComponent: () =>
      import('./Features/Flats/flat-list/flat-list')
        .then(m => m.FlatList)
  },


  // =========================
  // MAINTENANCE
  // =========================

  {
    path: 'maintenance/add',
    loadComponent: () =>
      import('./Features/Maintenance/maintenance-form/maintenance-form')
        .then(m => m.MaintenanceForm)
  },

  {
    path: 'maintenance/edit/:id',
    loadComponent: () =>
      import('./Features/Maintenance/maintenance-form/maintenance-form')
        .then(m => m.MaintenanceForm)
  },

  {
    path: 'maintenance/:id',
    loadComponent: () =>
      import('./Features/Maintenance/maintenance-details/maintenance-details')
        .then(m => m.MaintenanceDetails)
  },

  {
    path: 'maintenance',
    loadComponent: () =>
      import('./Features/Maintenance/maintenance-list/maintenance-list')
        .then(m => m.MaintenanceList)
  },


  // =========================
  // PARKING
  // =========================

  {
    path: 'parking/add',
    loadComponent: () =>
      import('./Features/Parking/parking-form/parking-form')
        .then(m => m.ParkingForm)
  },

  {
    path: 'parking/edit/:id',
    loadComponent: () =>
      import('./Features/Parking/parking-form/parking-form')
        .then(m => m.ParkingForm)
  },

  {
    path: 'parking/:id',
    loadComponent: () =>
      import('./Features/Parking/parking-details/parking-details')
        .then(m => m.ParkingDetails)
  },

  {
    path: 'parking',
    loadComponent: () =>
      import('./Features/Parking/parking-list/parking-list')
        .then(m => m.ParkingList)
  },


  // =========================
  // STAFF
  // =========================

  {
    path: 'staff/add',
    loadComponent: () =>
      import('./Features/Staff/staff-form/staff-form')
        .then(m => m.StaffForm)
  },

  {
    path: 'staff/edit/:id',
    loadComponent: () =>
      import('./Features/Staff/staff-form/staff-form')
        .then(m => m.StaffForm)
  },

  {
    path: 'staff/:id',
    loadComponent: () =>
      import('./Features/Staff/staff-details/staff-details')
        .then(m => m.StaffDetails)
  },

  {
    path: 'staff',
    loadComponent: () =>
      import('./Features/Staff/staff-list/staff-list')
        .then(m => m.StaffList)
  },


  // =========================
  // INVALID URL
  // =========================

  {
    path: '**',
    redirectTo: 'flats'
  }

];