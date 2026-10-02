import { Routes } from '@angular/router';

import { AuthLayoutComponent } from './Shared/AuthLayout/authlayout/authlayout';
import { MainLayoutComponent } from './Shared/MainLayout/main-layout/main-layout';

export const routes: Routes = [

  // ==================================================
  // AUTH LAYOUT
  // ==================================================

  {
    path: '',
    component: AuthLayoutComponent,
    children: [

      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },

      {
        path: 'login',
        loadComponent: () =>
          import('./Features/auth/login/login')
            .then(m => m.Login)
      },

      {
        path: 'register',
        loadComponent: () =>
          import('./Features/auth/register/register')
            .then(m => m.Register)
      }

    ]
  },


  // ==================================================
  // MAIN LAYOUT
  // ==================================================

  {
    path: '',
    component: MainLayoutComponent,
    children: [

      // DASHBOARD
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./Features/dashboard/dashboard')
            .then(m => m.DashboardComponent)
      },


      // ==================================================
      // USERS
      // ==================================================

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


      // ==================================================
      // BUILDINGS
      // ==================================================

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


      // ==================================================
      // NOTICES
      // ==================================================

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


      // ==================================================
      // DOCUMENTS
      // ==================================================

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


      // ==================================================
      // FLATS
      // ==================================================

      {
        path: 'flats',
        loadComponent: () =>
          import('./Features/Flats/flat-list/flat-list')
            .then(m => m.FlatList)
      },

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


      // ==================================================
      // MAINTENANCE
      // ==================================================

      {
        path: 'maintenance',
        loadComponent: () =>
          import('./Features/Maintenance/maintenance-list/maintenance-list')
            .then(m => m.MaintenanceList)
      },

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


      // ==================================================
      // PARKING
      // ==================================================

      {
        path: 'parking',
        loadComponent: () =>
          import('./Features/Parking/parking-list/parking-list')
            .then(m => m.ParkingList)
      },

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


      // ==================================================
      // STAFF
      // ==================================================

      {
        path: 'staff',
        loadComponent: () =>
          import('./Features/Staff/staff-list/staff-list')
            .then(m => m.StaffList)
      },

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


      // ==================================================
      // RESIDENT
      // ==================================================

      {
        path: 'resident',
        loadComponent: () =>
          import('./Features/Resident/Component/resident-component/resident-component')
            .then(m => m.ResidentComponent)
      },


      // ==================================================
      // COMPLAINT
      // ==================================================

      {
        path: 'complaint',
        loadComponent: () =>
          import('./Features/Complaint/Component/complaint-component/complaint-component')
            .then(m => m.ComplaintComponent)
      },


      // ==================================================
      // PAYMENT
      // ==================================================

      {
        path: 'payment',
        loadComponent: () =>
          import('./Features/Payment/Component/payment-component/payment-component')
            .then(m => m.PaymentComponent)
      },


      // ==================================================
      // EMERGENCY
      // ==================================================

      {
        path: 'emergency',
        loadComponent: () =>
          import('./Features/Emergency/Component/emergency-component/emergency-component')
            .then(m => m.EmergencyComponent)
      }

    ]
  },


  // ==================================================
  // INVALID URL
  // ==================================================

  {
    path: '**',
    redirectTo: 'login'
  }

];