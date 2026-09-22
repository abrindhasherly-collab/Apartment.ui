import { Routes } from '@angular/router';

export const routes: Routes = [
  {
  path: 'dashboard',
  loadComponent: () =>
    import('../app/dashboard/dashboard')
      .then(m => m.Dashboard)
},

  {
    path: 'resident',
    loadComponent: () =>
      import('./Features/Resident/Component/resident-component/resident-component')
        .then(m => m.ResidentComponent)
  },

  {
    path: 'complaint',
    loadComponent: () =>
      import('./Features/Complaint/Component/complaint-component/complaint-component')
        .then(m => m.ComplaintComponent)
  },

  {
    path: 'payment',
    loadComponent: () =>
      import('./Features/Payment/Component/payment-component/payment-component')
        .then(m => m.PaymentComponent)
  },

  {
    path: 'emergency',
    loadComponent: () =>
      import('./Features/Emergency/Component/emergency-component/emergency-component')
        .then(m => m.EmergencyComponent)
  },

  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },

  {
    path: '**',
    redirectTo: 'dashboard'
  }

];