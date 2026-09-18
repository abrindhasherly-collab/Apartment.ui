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