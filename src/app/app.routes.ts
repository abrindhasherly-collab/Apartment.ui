import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  // AUTH
  {
    path: 'login',
    loadComponent: () =>
      import('./Features/login/login')
        .then(m => m.Login)
  },

  {
    path: 'register',
    loadComponent: () =>
      import('./Features/register/register')
        .then(m => m.Register)
  },

  // USERS
  {
    path: 'users',
    loadComponent: () =>
      import('./Features/users/user-list/user-list')
        .then(m => m.UserList)
  },

  {
    path: 'users/add',
    loadComponent: () =>
      import('./Features/users/user-form/user-form')
        .then(m => m.UserForm)
  },

  {
    path: 'users/edit/:id',
    loadComponent: () =>
      import('./Features/users/user-form/user-form')
        .then(m => m.UserForm)
  },

  {
    path: 'users/:id',
    loadComponent: () =>
      import('./Features/users/user-details/user-details')
        .then(m => m.UserDetails)
  },

  // BUILDINGS
  {
    path: 'buildings',
    loadComponent: () =>
      import('./Features/buildings/building-list/building-list')
        .then(m => m.BuildingList)
  },

  {
    path: 'buildings/add',
    loadComponent: () =>
      import('./Features/buildings/building-form/building-form')
        .then(m => m.BuildingForm)
  },

  {
    path: 'buildings/edit/:id',
    loadComponent: () =>
      import('./Features/buildings/building-form/building-form')
        .then(m => m.BuildingForm)
  },

  {
    path: 'buildings/:id',
    loadComponent: () =>
      import('./Features/buildings/building-details/building-details')
        .then(m => m.BuildingDetails)
  },

  // NOTICES
  {
    path: 'notices',
    loadComponent: () =>
      import('./Features/notices/notice-list/notice-list')
        .then(m => m.NoticeList)
  },

  {
    path: 'notices/add',
    loadComponent: () =>
      import('./Features/notices/notice-form/notice-form')
        .then(m => m.NoticeForm)
  },

  {
    path: 'notices/edit/:id',
    loadComponent: () =>
      import('./Features/notices/notice-form/notice-form')
        .then(m => m.NoticeForm)
  },

  {
    path: 'notices/:id',
    loadComponent: () =>
      import('./Features/notices/notice-details/notice-details')
        .then(m => m.NoticeDetails)
  },

  // DOCUMENTS
  {
    path: 'documents',
    loadComponent: () =>
      import('./Features/documents/document-list/document-list')
        .then(m => m.DocumentList)
  },

  {
    path: 'documents/add',
    loadComponent: () =>
      import('./Features/documents/document-form/document-form')
        .then(m => m.DocumentForm)
  },

  {
    path: 'documents/edit/:id',
    loadComponent: () =>
      import('./Features/documents/document-form/document-form')
        .then(m => m.DocumentForm)
  },

  {
    path: 'documents/:id',
    loadComponent: () =>
      import('./Features/documents/document-details/document-details')
        .then(m => m.DocumentDetails)
  },

  // INVALID URL
  {
    path: '**',
    redirectTo: 'login'
  }
];
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